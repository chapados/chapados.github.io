--- 
title: Infrant ReadyNAS shell access
mephisto_id: 35
author_email: kd@gm.com
article_id: 14
author_ip: 67.52.252.178
created_at: 2006-12-23 05:28:29 -08:00
layout: post
---
There's still one problem though that I can't resolve for the life of me. Compiling programs works fine after installing libc6-dev (by hand, because using dpkg directly doesn't work, but its easy to copy the files because they're all in /usr.. once you do that you can dpkg -i apt and use apt-get to get gcc and all the other tools). 

But when configuring programs, the system header file check fails. My example I've been using is Apache 1.3. Try to configure and make it, and it tries to include headers that are not supposed to be available for the linux build.

The reason I believe it does this is that the system headers check is performed by trying to compile a file like this (see src/Configure and src/tools/checkheaders.sh):

#include <bstring.h>
SYNTAX ERROR

And then checking the response gotten back from the executed program (so. the return of gcc), through the shell variable $?  . I have no idea why, but this always returns 0, instead of returning 1 on failure like it's supposed to (you know when you do an int main() on a c program, and return for main? That's what this number is).

If anybody has any idea how to fix this, I'd love to hear suggestions. I've tried replacing the shell with a different one.. no luck. Hacking the headers out of the configure manually works of course, but it's a pain.
