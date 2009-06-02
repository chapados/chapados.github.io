--- 
title: Infrant ReadyNAS shell access
mephisto_id: 27
author_email: brian@chapados.org
article_id: 14
author_url: http://chapados.org
author_ip: 71.136.241.9
created_at: 2006-12-14 09:33:53 -08:00
layout: post
---
If you get a working compiler installed through apt-get/dpkg then let me know. However, if the solution requires manually installing things under /usr/lib, then I'm personally not so keen to go that route. If you look at the public patches released by Infrant in order to satisfy the GPL, one of them is libc. If you overwrite the existing libc in the process of trying to install gcc via apt-get, I'm sure something bad will happen. Also remember that the CPU is not a standard SPARC processor so it's quite possible that the vanilla gcc for gnu-sparc-linux might not work. I'm actually using the box for live backups at this point, so I'm hesitant to do something that might trash the system. Building a cross-compiler avoids this issue.

Thanks for the link to the ext2/3 drivers for windows. There are also ext2/3 drivers for os x, but they didn't work correctly in this case, so I decided that a linux Live CD was the safest option.

As for Infrant, I think they've done something great in producing the ReadyNAS. There's no point in trying to post this info or any references to it on their forums. They will just delete it anyway. It's unfortunate that providing ssh access has not been a higher priority for the company. However, I have no doubt that they will eventually deliver on their promise to provide "official" ssh access. In the meantime, people who want the information will ask google, and find the answer.
