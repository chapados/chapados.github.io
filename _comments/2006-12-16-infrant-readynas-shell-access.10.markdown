--- 
title: Infrant ReadyNAS shell access
mephisto_id: 30
author_email: brian@chapados.org
article_id: 14
author_url: http://chapados.org
author_ip: 71.136.241.9
created_at: 2006-12-16 04:19:12 -08:00
layout: post
---
Samba appears to be version 3.0.22 (returned by smbd -V on the box) or 3.0.21a [according to infrant][infrant-gpl]. Since samba is licensed under the GPL, you can download the source for yourself and see if there are any substantial changes. I don't know for sure, but I do know that SMB/CIFS unfortunately (for me) seems to be the optimal protocol for file transfers to/from the ReadyNAS. The ldap daemon (slapd) does not appear to be installed, but you could probably add it. I don't know about AD (active directory?).  I personally have no need for AD, ldap or samba. Kyle seems to be on Windows so maybe he knows more about that area. I'm *guessing* that these "instructions" would work for the NV+. However, all of this is obviously completely unsupported, so there are no guarantees. Before you buy, check the [Infrant forums][forums] regarding any performance issues, depending on what your needs are.

[infrant-gpl]: http://www.infrant.com/products/products_details.php?name=RAIDiator#
[forums]: http://www.infrant.com/forum
