--- 
title: Infrant ReadyNAS shell access
mephisto_id: 40
author_email: apnarr@gmail.com
article_id: 14
author_ip: 69.140.44.177
created_at: 2007-01-13 02:53:20 -08:00
layout: post
---
With regard to the 'marked bills'...  Once you are in it's easy enough to tweak any file you like and them create your own .enc files.  There is an executable that you can run to generate the .enc files called /usr/bin/hwencrypt.  It takes two parameters, first the name of the input file and second the name of the output files.  So you would run it like:

  /usr/bin/hwencrypt /etc/passwd /etc/passwd.enc

-apnar
