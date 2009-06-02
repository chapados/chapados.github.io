--- 
title: Infrant ReadyNAS shell access
mephisto_id: 24
author_email: kd3@gmail.com
article_id: 14
author_ip: 75.72.176.15
created_at: 2006-12-14 02:52:11 -08:00
layout: post
---
Just an update... I went and got the apt package frontend, to simplify adding new packages. You can get it here:

http://packages.debian.org/stable/admin/apt

And then put it on the machine and run:

dpkg -i apt_0.5.28.6_sparc.deb

Presto, now you have apt-get!

I've gotten CVS installed on it through apt-get so far.. had less luck getting the compiler suite going.. it installed gcc and make okay, but I'm missing some libraries. When I try to compile my own copy of apache, I get the following message:


** A test compilation with your Makefile configuration
** failed.  The below error output from the compilation
** test will give you an idea what is failing. Note that
** Apache requires an ANSI C Compiler, such as gcc.

======== Error Output for sanity check ========
cd ..; gcc  -DLINUX=22 -DUSE_HSREGEX -DUSE_EXPAT -I./lib/expat-lite -DNO_DL_NEED                         ED `./apaci`     -o helpers/dummy helpers/dummy.c   -lm
/usr/bin/ld: crt1.o: No such file: No such file or directory
collect2: ld returned 1 exit status
make: *** [dummy] Error 1
============= End of Error Report =============

A google of the error message says to run apt-get install libc6-dev, but that blows up when I try to run it (not too surprisingly).

I'll keep at it and post my progress. I guess this means you've become the official home of ReadyNAS modifying ;)
