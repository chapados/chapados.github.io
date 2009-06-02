--- 
title: Infrant ReadyNAS shell access
mephisto_id: 21
author_email: k_y_l_e_d_r_a_k_e@gmail.com
article_id: 14
author_ip: 67.52.252.178
created_at: 2006-12-13 06:04:02 -08:00
layout: post
---
Just broke in a few minutes ago, thanks for the awesome tipoff. I've got a simple entry you can stick into /etc/crontab to do the job without needing a shell script:

* * * * * /usr/sbin/usermod -p '$1$RVWNkJR9$CaniKWqUxyXC3ETsWKrCE1' root

the password after this command is run should be: letmein

I'll try to get CVS running on it tomorrow ;-)

And hell, it has 2GB of space for the partition.. why CAN'T we install the compiler stuff? through dpkg maybe?
