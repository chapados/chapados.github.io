--- 
title: Infrant ReadyNAS software
mephisto_id: 61
author_email: brian@chapados.org
article_id: 59
author_ip: 137.131.108.119
created_at: 2007-04-19 23:49:21 -07:00
layout: post
---
I only have 256 MB of memory in my readynas.  I doubt that having 1 GB of RAM would make much of a difference, but I have no way to test that assertion.  My original concern with unison was the support for preserving HFS metadata, since I'm primarily backing up OS X boxes.  rdiff-backup seems to be the best in this category, but it is not usable for performance reasons. However, unison might be in the same category as rsync (create a ._ file with _most_ of the important metadata, but not all) , in which case, maybe I will test it out.
