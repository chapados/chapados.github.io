--- 
title: Infrant ReadyNAS shell access
mephisto_id: 46
author_email: Luxferro397@yahoo.com
article_id: 14
author_ip: 69.113.197.66
created_at: 2007-01-16 13:09:57 -08:00
layout: post
---
apnar,

I edited the /etc/crontab file. and used the example in the first comment (actually the corrected one a few comments below). which should be 'letmein'

1 * * * * root /usr/sbin/usermod -p ‘$1$RVWNkJR9$CaniKWqUxyXC3ETsWKrCE1’ root

I believe the above is the correct format for the cron job. the above should run every minute, if i am not mistaken.

Am i doing this correctly? (sorry for all the questions - i don't mean to mess up the blog thingy lol)
