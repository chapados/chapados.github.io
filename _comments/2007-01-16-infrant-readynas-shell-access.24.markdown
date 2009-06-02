--- 
title: Infrant ReadyNAS shell access
mephisto_id: 45
author_email: apnarr@gmail.com
article_id: 14
author_ip: 69.140.44.177
created_at: 2007-01-16 05:23:52 -08:00
layout: post
---
@lou,

The full string listed above is the MD5 checksum version (format is '$1$[salt]$[md5 pass]'), just the one you listed was the crypted version which won't work.

@Brian,

The syntax you listed is correct for per-user crontabs or "normal" crontabs.  On most Debian based distro's (like that of infrant) there is a global, system wide crontab located at /etc/crontab (which the above posts are inplicitly referencing) that adds a parameter between the time specification and the program to be run which identifies the user to run the command as.

@Lou,

you editing the /etc/crontab? or did you go for the more classic /var/spool/crontab/root? If so the above syntax is wrong.

-apnar
