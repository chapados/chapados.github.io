--- 
title: Infrant ReadyNAS shell access
mephisto_id: 42
author_email: apnarr@gmail.com
article_id: 14
author_ip: 69.140.44.177
created_at: 2007-01-13 18:45:51 -08:00
layout: post
---
Lou,

Looks like you are using the crypted version of the password instead of the md5ed version.  You can generate the md5 version of the password by running:

  openssl passwd -1

-apnar
