--- 
title: OS X automount utilities
mephisto_id: 4
layout: post
---
Do you love the combination of elegance and power offered by OS X? Are you a
unix-afficionado turned mac-evangelist, telling all your friends that OS X
is _the_ OS? Are you trying to use your mac in an existing \*nix-based
networking environment? If so, I'm willing to bet that you're frustrated by the
lack of support for NFS-based automount capabilities in OS X. Since this issue
is obviously not a priority for Apple, I've taken matters into my own hands and
produced a "hack" that is not pretty, but gets the job done.

## The problem ##
You have an existing network of \*nix computers, with thousands of network
shares managed by Sun-style NFS servers.  You would like your mac to access
these resources using the automounter to mount available network shares on
demand. You have read the Apple 'automount' man page and discovered that the
automount command that ships with OS X does not handle Sun-style automount
maps.

## The solution ##
When I was faced with this problem a few years ago, I wrote
[osx_automount][]. These
scripts are available as open source software under the MIT License. They work
for us here at [TSRI][]. I've tried to make them fairly
flexible, but they might require custom modification to meet your needs.

[osx_automount]: http://chapados.org/download/osx_automount.tar.gz
[tsri]: http://www.scripps.edu/

## Get the software ##
**[Update: 25-Jul-2006]**

I've been busy enough over the last few months not to notice the error messages
in my log files regarding failed attempts to download the tar file for this software.
My apologies to those of you who are itching to try out these scripts.
I fixed the links, and you can now download the software:

[osx_automount version 0.5.1][osx_automount]

**[Update: 18-May-2007]**

Version 0.5.1 changes the format of the auto_master file to match the output of `ypcat -k auto.master`. Thanks to Howard Moftich for pointing out this bug.   

### Overview of the automount scripts ###
NFS automount startup is controlled by the StartupItem script
/System/Library/StartupItems/NFS/NFS. This script starts nfsd,mountd and
automount. The osx_automount script is a wrapper that controls only automount.
By separating the control logic for automount, this script provides a
convenient command-line interface for controlling multiple automount processes.

#### osx_automount ####
The master control script.  osx_automount handles starting, stopping,
restarting and updating automount processes.

#### automap2applemap ####
A python script that converts Sun-style NFS maps to flat-file maps formatted
for use with Apple automount. This script retrieves maps via 'ypcat' and has
optional parameters for excluding mount points based on the server name or
the directory name. In addition, this script adds rw, resvport, soft, and
intr options for each mount point. This is currently not configurable, but it
should be trivial to add an optional switch for this functionality if you need
it.

### Installation ###
Installation is trivial, but not automated. If you're not comfortable working
in a unix shell, then ask Google for help, or find someone to help you. First,
untar the archive in /etc to create /etc/automount. Next, edit the file
/etc/automount/auto_master to include the table of automount maps and map
points for your network setup. If you want everything, you should be able to
get the latest auto.master file with this command:

    $ cd /etc
    $ sudo tar xzvf /path/to/osx_automount.tar.gz
    $ sudo ypcat -k auto.master >! /etc/automount/auto_master

You can start the automount processes now using the script:

    $ sudo killall automount
    $ sudo /etc/automount/osx_automount start

### Automount on startup ###
To make the automounter startup on boot, you need to modify the startup script
that controls NFS startup. Make a backup copy of
/System/Library/StartupItems/NFS/NFS and then  edit the file, and find the
automount section:

#### /System/Library/StartupItems/NFS/NFS ####

    ## 
    # Start the automounter
    ##
     
    if [ "$\{AUTOMOUNT:=-YES-}" = "-YES-" ]; then
        automount -m /Network -nsl -mnt ${AUTOMOUNTDIR}
        ln -s /automount/Library /Network/Library 
        automount -m /automount/Servers -fstab \
            -mnt /private/Network/Servers \
            -m /automount/static -static -mnt ${AUTOMOUNTDIR}
        ln -s /automount/Servers /Network/Servers
      
        # 
        # Hint that the name /Network should be localized:
        #
        ln -s . /Network/.localized
    fi

Delete or comment-out everything inside the 'if' statement, and replace it with
a call to osx\_automount. Note that the osx\_automount script will start the
standard automount processes to provide the Network/Servers browser
functionality.

#### modified /System/Library/StartupItems/NFS/NFS ####
    if [ "$\{AUTOMOUNT:=-YES-}" = "-YES-" ]; then
        if [ -f /etc/automount/osx_automount ]; then
            # BRC: starting osx_automount
            /etc/automount/osx_automount start
        fi
    fi
