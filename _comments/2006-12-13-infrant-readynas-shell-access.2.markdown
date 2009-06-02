--- 
title: Infrant ReadyNAS shell access
mephisto_id: 22
author_email: brian@chapados.org
article_id: 14
author_url: http://chapados.org
author_ip: 71.136.241.9
created_at: 2006-12-13 07:04:03 -08:00
layout: post
---
Thanks for taking the time to comment and adding the extra tip. I haven't tried installing the generic sparc-linux gcc with dpkg, but I built a cross compiler on a linux box using crosstool. I haven't run the test suite on the cross compiler, but I have successfully compiled rsync, python, and some libraries necessary for rdiff-backup, so it seems to be able to handle userland programs without a problem. Compiling gdb and a working kernel might be another issue. I was hoping to get the tests done before I post the instructions for building the cross compiler and installing rdiff-backup. I'll try to get that stuff done this weekend.
