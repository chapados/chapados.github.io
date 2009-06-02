--- 
title: Building a compiler for the Infrant ReadyNAS
mephisto_id: 38
layout: post
---
Having shell access is cool, but the real fun doesn't begin until you can build and run the software that you want on the ReadyNAS. After an embarrassingly long delay, here is the second installment of my series on [Infrant ReadyNAS hacks][]. In this article, I'll show you how to use [crosstool][] to build a gcc compiler on a x86 linux box that you can use to compile software to run on your ReadyNAS.

As opposed to installing a development environment on the ReadyNAS itself, a cross compiler offers a few key advantages:

[infrant readynas hacks]: http://chapados.org/2006/11/23/infrant-readynas-hacks
[crosstool]: http://kegel.com/crosstool/

1. The ReadyNAS is slow and doesn't have much memory (256 MB by default). Compiling software on the box would take a long time.
2. It requires minimal modifications to the ReadyNAS. Let's face it, at the end of the day, you probably want to use the ReadyNAS for backups, which means you probably want a stable operating system that is compatible with upgrades released by Infrant. Manually installing the files necessary for a working development environment on the ReadyNAS is [neither trivial nor elegant][readynas-dpkg-gcc]. I'm not sure if it would cause problems with future updates, but it is certainly an ugly solution.

[readynas-dpkg-gcc]: http://chapados.org/2006/11/23/infrant-readynas-shell-access/comments/35

Your first reaction to term "cross compiler" or "cross toolchain" might be that it sounds complicated, especially for an unknown system.  I'm not an expert on gcc by any stretch of the imagination. Fortunately, the people who are experts have packaged up their knowledge into a set of shell scripts called [crosstool][], which mostly automates the process of building a cross compiler/toolchain. In short, [Dan Kegel][] and the crosstool contributors are my heros.  They deserve the lions share of credit for their work.  I'm just a user reporting results.

[Dan Kegel]: http://kegel.com

### Resouces ###

1. Access to an x86 linux box with a working build environment.

2. [Crosstool][]. Go and download [crosstool v0.43][crosstool-download].

[crosstool-download]: http://kegel.com/crosstool/crosstool-0.43.tar.gz

3. [Patches for glibc-2.3.2][patches] [released] by Infrant in accordance with the GPL. 

[released]: http://www.infrant.com/products/products_details.php?name=RAIDiator#
[patches]: http://www.infrant.com/download/GPL/glibc-2.3.2.ds1.tar.bz2

4. Time.  It will probably take a few to several hours to build the tool chain, depending on the speed of your system.

### Background ###

If you haven't already, go read the [crosstool howto][], I'll wait.

[crosstool howto]: http://kegel.com/crosstool/crosstool-0.43/doc/crosstool-howto.html


### Crosstool configuration for Infrant ReadyNAS ###

Crosstool knows how to build toolchains for various combinations of glibc/gcc to run on target systems. For the purposes of configuring crosstool, we can assume that the ReadyNAS is just running vanilla sparc-linux. We already know that the ReadyNAS uses glibc-2.3.2. According to the crosstool [build matrix][], there are only a few versions of gcc that are likely to work.

[build matrix]: http://kegel.com/crosstool/crosstool-0.43/buildlogs/index.html

So, there actually aren't many Infrant-specific modifications that haven't already been [provided by Infrant][released]. However, to keep your crosstool directory nice and neat, you might want to set things up as follows:

In your crosstool directory, make yourself a customized copy of demo-sparc.sh

    cp demo-sparc.sh infrant-sparc.sh

I was able to successfully build gcc-3.3.6 and glibc-2.3.2, so I recommend using that combination. For example, my infrant-sparc.sh file looks something like this:

    #!/bin/sh
    set -ex
    TARBALLS_DIR=$HOME/downloads
    RESULT_TOP=/opt/crosstool
    export TARBALLS_DIR RESULT_TOP
    GCC_LANGUAGES="c,c++"
    export GCC_LANGUAGES

    # Really, you should do the mkdir before running this,
    # and chown /opt/crosstool to yourself so you don't need to run as root.
    mkdir -p $RESULT_TOP

    # Build the toolchain.  Takes a couple hours and a couple gigabytes.
    eval `cat sparc.dat gcc-3.3.6-glibc-2.3.2.dat`         sh all.sh --notest

    echo Done.

### Get & Patch glibc-2.3.2 ###

If you just started crosstool at this point, it would download all necessary programs, apply patches necessary for building a cross compiler and build. It really is that easy. In our case, the only thing we want to do differently is use the patched version of glibc-2.3.2 from Infrant. Download glibc-2.3.2 from your favority Debian mirror, and create the following shell script to apply the infrant patches:

##### apply-patches.sh:
    #!/bin/bash

    VERSION=2.3.2 # version of glibc

    # Patch in the Debian patches:
    DPATCHES="$( grep -v '^#' debian/patches/00list | grep infrant )"
    for pf in ${DPATCHES}; do
        patchf=debian/patches/${pf}.dpatch
        if [ -s ${patchf} ]; then
          echo "$patchf"
          chmod 755 ${patchf}
          ${patchf} -patch glibc-${VERSION}
        fi
    done

Now unpack the tar file, apply patches, and repackage the source:

    cd $HOME/downloads
    mkdir infrant
    cd infrant
    wget http://www.infrant.com/download/GPL/glibc-2.3.2.ds1.tar.bz2
    tar xjvf glibc-2.3.2.ds1.tar.bz2
    cd glibc-2.3.2.ds1
    chmod +x prep.sh
    ./prep.sh
    ./apply-patches.sh
    tar cvf ../../glibc-2.3.2.tar ./glibc-2.3.2
    cd ..
    bzip2 glibc-2.3.2.tar

These commands download the glibc-2.3.2 from Infrant, unpack the debian distribution, and apply all the patches (prep.sh). The end result is a glibc-2.3.2 directory ready to be built. We then pack up the patched source directory to create a glibc-2.3.2.tar.bz2 file in the download directory.  Crosstool will find this file and use it instead of downloading the vanilla glibc-2.3.2.tar.bz2.

#### Are these patches really necessary? ####

I'm not sure if this step is necessary, because I never even tried to build the cross toolchain without using Infrant's glibc-2.3.2.  I know, I know, I wasn't being very scientific, but I didn't have time to mess around forever with this stuff. Building gcc and friends takes time.  If you try it without the patched glibc and it works, please let me know.

### Build it ###

    cd $HOME/crosstool
    sudo mkdir -p /opt/crosstool
    sudo chmod 777 /opt/crosstool
    ./infrant-sparc.sh | tee infrant-sparc-glibc-2.3.2-gcc-3.3.6.log

You don't need to use tee, but I like to keep a log of the build.

After some time, your build should have completely successfully, and you will have a cross toolchain in /opt/crosstool.

### Test it ###

The right way to test your new toolchain is to use [crosstest][]. Dan Kegel has written up some very nice documentation on exactly how to test gcc using dejavu. I am guilty of not doing this yet. Sorry.  The worst part is that I was holding up this article for the test results. Sorry. It seems like there is enough interest in this information to just provide it "as is" for now, with a "works for me" clause. When I get the tests done, I will post another article about testing. Until, then I can only report that it works for the limited number of userland programs that I've tried.

[crosstest]: http://kegel.com/crosstool/crosstool-0.43/doc/crosstest-howto.html

### Build stuff ###

If you're not planning to run the full test suite, you should at least try building a few "userland" programs. You can start with the classic hello world:

    /* hello.c : prints "hello world" */
    #include <stdio.h>
    int main(void) {
        printf("hello world\n");
    }

This will at least tell you that you can compile a basic running program.  To compile it, save the text above into a file called hello.c, then:

    /opt/crosstool/gcc-3.3.6-glibc-2.3.2/sparc-unknown-linux-gnu/bin/sparc-unknown-linux-gnu-gcc -o hello hello.c

Copy the "hello" executable to your ReadyNAS, run and make sure it prints "hello world" on the screen. This works, but it's annoying to deal with the long paths. I like to wrap all the commands necessary for using the cross toolchain into a shell script.  Here's an example:


    #!/bin/bash
    
    TARGET="sparc-unknown-linux-gnu"
    CROSSBIN="/opt/crosstool/gcc-3.3.6-glibc-2.3.2/sparc-unknown-linux-gnu/bin"

    CROSS="${CROSSBIN}/${TARGET}-"

    PATH="$PATH":$CROSSBIN
    export PATH

    # build commands below this line
    # --------------------------
    ${CROSS}gcc -o hello hello.c

Unfortunately, according to the crosstool website, the [builduserland option is broken][issues] for the time being. I've successfully compiled rsync, Python and the C components of rdiff-backup. I promise to post those instructions soon as an example of what is possible.

[issues]: http://kegel.com/crosstool/crosstool-0.43/doc/crosstool-howto.html#issues

##### [UPDATED: 22-March-2007] #####
I realized that I forgot to include the step for actually applying the patches from infrant. This is now included as the apply-patches.sh shell script.
