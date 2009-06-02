--- 
title: Infrant ReadyNAS shell access
mephisto_id: 44
author_email: brian@chapados.org
article_id: 14
author_url: http://chapados.org
author_ip: 71.136.241.204
created_at: 2007-01-14 22:26:21 -08:00
layout: post
---
> I’m a unix/linux noob, and am having trouble getting my root password to change. I have the following line in my crontab file:
>
> 1 * * * * root /usr/sbin/usermod -p ‘Ynv8NAEC5ghJ6’ root

I suspect this might not a problem with the password string. Check the syntax for crontab timing again (from [scrounge.org][]):

    Here is the format of a cron job file:

    [min] [hour] [day of month] [month] [day of week] [program to be run]

    where each field is defined as
    [min]	Minutes that program should be executed on. 0-59. Do not set as * or the program will be run once a minute.
    [hour]	Hour that program should be executed on. 0-23. * for every hour.
    [day of month]	Day of the month that process should be executed on. 1-31. * for every day.
    [month]	Month that program whould be executed on. 1-12 * for every month.
    [day of week]	Day of the week. 0-6 where Sunday = 0, Monday = 1, ...., Saturday = 6. * for every day of the week.
    [program]	Program to be executed. Include full path information.


[scrounge.org]: http://www.scrounge.org/linux/cron.html
