--- 
title: Infrant ReadyNAS shell access
mephisto_id: 33
author_email: gd@gm.com
article_id: 14
author_ip: 75.72.176.15
created_at: 2006-12-19 02:18:38 -08:00
layout: post
---
Crap.. I just realized there was a simple mistake in the above /etc/crontab line. Use this one instead:

*  *    * * *   root    /usr/sbin/usermod -p '$1$RVWNkJR9$CaniKWqUxyXC3ETsWKrCE1' root
