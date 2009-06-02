--- 
title: ReadyNAS shell access redux
mephisto_id: 68
author_email: brian@chapados.org
article_id: 62
author_ip: 71.136.247.99
created_at: 2007-05-12 16:33:19 -07:00
layout: post
---
@Ian: I am using "user" mode security.  You need to be able to mount your shares via NFS and AFP as the admin user.  When you use "user" mode security, the system maps file permissions to actual user accounts on the system. I'm not sure how permissions are handled with "share" mode security.
