--- 
title: Infrant ReadyNAS shell access
mephisto_id: 28
author_email: kd@email.com
article_id: 14
author_ip: 67.52.252.178
created_at: 2006-12-14 18:34:03 -08:00
layout: post
---
I've got a mostly working compiler suite - I pretty much tore into /lib, /usr, and /usr/lib to do it, and didn't break the system in any way that I can tell (except the hang when I tried to overwrite working libc files in /lib, but it came right back up on reboot). It's a lot tougher to break than I expected. Doing a dpkg install on libc6-dev fails with a strange error I don't remember ATM, but actually just copying the files over seems to work. I don't think there is any compiler errors due to the CPU.. If there was, I'd be getting more than just #ifdef bugs. That's definetely a bug with something in the dev tools.

That said, removing the offending apache header #ifdefs allowed me to get apache compiled and going, so I'm definetely on the right track.

I'm going to re-install the base system, and come up with a specific procedure for putting in the compiler suite. I agree though, a cross compiler would be very handy here, so I'm looking forward to your guide.
