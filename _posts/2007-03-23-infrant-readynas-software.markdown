--- 
title: Infrant ReadyNAS software
mephisto_id: 59
created_at: 2007-03-23 02:37:43 -07:00
layout: post
---
The first quarter of 2007 is almost over and Infrant has still not released any patches that enable ssh access to the readynas.  I guess they were probably too busy [putting out fires][vista-issues] caused by Windows Vista.  Those poor bastards.

[vista-issues]: http://www.infrant.com/forum/viewtopic.php?t=9624

Judging from the responses to my [cross-compiler post][readynas-cc] (a few spam messages and 1 real response), I think most people would prefer to just download pre-compiled software, rather than go through the hassle of building and using a cross-compiler. In an ideal world, I would bundle up some of the packages I've compiled as .deb files that could be installed with dpkg.  If there is enough interest, maybe I will make some time for doing that.  Until then, I'm just going to redistribute the compiled packages along with the full source code. I've read through the license agreements and  I'm pretty sure that I'm complying with all the conditions for each package. If I'm not, please tell me.  It is not my intention to illegally redistribute this software.

[readynas-cc]: http://chapados.org/2007/1/16/building-a-compiler-for-the-infrant-readynas

I usually just build things when I need them for some reason.  Since I've been primarily concerned about backups, I've tried rdiff-backup and rsync with extended attributes. I will add new software to this page if/when I end up building it for the readynas. Enjoy!

(Unless otherwise noted, you can install all of the prerequisite software from the debian-sparc repository)

## rdiff-backup ##
[rdiff-backup-1.1.9-readynas.tar.bz2][rdiff-backup-dist]
md5: c029e2ab6ad6a99f6b7aec2c7be871ab

[rdiff-backup-dist]: http://chapados.org/assets/2007/3/23/rdiff-backup-1.1.9-readynas.tar.bz2

This is a great backup program.  However, due to the extreme strain it puts on the meager CPU of the readynas, it is not usable on the readynas.

prerequisites: python, pylibacl, pyxattr, librsync

#### installation ####
The tar file contains the complete source code, along with the build directory containing the compiled C extensions.
1. install prerequisites
2. unpack the tarball
3. run the setup.py program (as root): sudo python setup.py install

## rsync-EA ##
[rsync-2.6.3-readynas.tar.bz2][rsync-dist]
md5: 1735165cb7ab886a089f0fc42e20766b

[rsync-dist]: http://chapados.org/assets/2007/3/23/rsync-2.6.3-readynas.tar.bz2

This is a patched version of rsync-2.6.3 with all of the patches from apple and [lartmaker.nl][] applied.  In addition, I back-ported some very minor changes from rsync-2.6.4 so that I could cross-compile the code. This version has worked well for me so far, and is my primary backup tool. The tar file contains the full source code along with the cross-compiled executable. 

[lartmaker.nl]: http://www.lartmaker.nl/rsync/

#### installation ####
1. unpack the tarball
2. 'sudo make install' to install rsync in /usr/local/bin.  Alternatively, you can just copy the executable to your favorite place.
