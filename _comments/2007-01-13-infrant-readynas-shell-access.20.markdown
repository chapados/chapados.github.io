--- 
title: Infrant ReadyNAS shell access
mephisto_id: 41
author_email: Luxferro397@yahoo.com
article_id: 14
author_ip: 69.113.197.66
created_at: 2007-01-13 06:27:26 -08:00
layout: post
---
I'm a unix/linux noob, and am having trouble getting my root password to change.
I have the following line in my crontab file:

1 * * * * root /usr/sbin/usermod -p 'Ynv8NAEC5ghJ6' root

Ynv8NAEC5ghJ6 = infrant1 (the default password for admin)

i don't know if i am using the correct characters ' to surround the encrypted password, but i have tried a few variation ' " and the character used in the original example. 

after making the change to the crontab file and attempting to login as root via putty, then poweringdown and remounting drive to see if the passwd file changed. I notice it did change somewhat, but not to what i put in the crontab.

example:
this is what passwd says root:$1$hT5/wz7e$sFbgA.UNlm469vOMJVrdP/:0:0:root:/root:/bin/bash
passwd- has the following root:$1$uQA0kr7e$NausyvlekOtRYzipVzXBN/:0:0:root:/root:/bin/bash

before attempting the change via crontab, both these files had same exact encrypted password.. so i assume the passwd- is the backup

If anyone can tell me what i am doing wrong please email me at luxferro397 at yahoo.com. thanks!
