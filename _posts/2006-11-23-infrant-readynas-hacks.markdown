---
layout: post
title: Infrant ReadyNAS hacks
tags: [backups, hacks, readynas]
mephisto_id: 16
created_at: 2006-11-23 07:05:14 -08:00
---
The [Infrant][] [ReadyNAS NV][] is an extremely capable network attached storage (NAS) device that packs some serious power into a tiny box. If you're in the market for a RAID storage device or perhaps even a home media server, give it a look. You'll probably be impressed.

[Infrant]: http://www.infrant.com 
[ReadyNAS NV]: http://www.infrant.com/products/products_details.php?name=ReadyNAS%20NV

The ReadyNAS supports up to 4 drives in RAID 0,1,5 or Infrant's proprietary [X-RAID][] configuration. The X-RAID technology allows you to add drives as you go and the machine automagically configures the RAID to give you redundant storage.

[x-raid]: http://www.infrant.com/products/tech.php

The ReadyNAS uses a proprietary SPARC-based CPU/motherboard, optimized for RAID in a small package. The [Raidiator][] OS is a slightly customized version of Debian GNU/Linux. So, when you buy a ReadyNAS NV, you are actually buying a tiny box optimized for life as a home RAID storage server.

[raidiator]: http://www.infrant.com/products/products_details.php?name=RAIDiator

Despite the impressive features, I had second thoughts, because the readynas doesn't provide ssh shell/root access.  It also doesn't support [rdiff-backup][], [rsnapshot][], or even a version of rsync that plays nicely with Mac OS X (see [this site][rsync-nl]). Shame on Infrant for thinking that power users will want to use their pre-packaged backup solution. In the end, my need for a small-footprint RAID solution for my music library and online backups won out. I bought a disk-less ReadyNAS from [eAegis][] and one 500 GB Seagate Barracuda ES drive from [newegg][]. I plan on adding a second drive soon, but in the meantime...

[eaegis]: http://www.eaegis.com
[newegg]: http://www.newegg.com
[rdiff-backup]: http://www.nongnu.org/rdiff-backup/
[rsnapshot]: http://www.rsnapshot.org/

Since I was already storing data on a stack of external hard drives, there was no immediate rush to transfer all my data to the ReadyNAS immediately. Thus, I had some time to "play" with it before using it as my production backup system. The result is a series of hacks for the Infrant ReadyNAS that I've put together in my spare time over the past couple months.

### Outline ###

In the next few articles, I hope to cover:

1. The first article covers gaining [root ssh shell access][infrant-shell-access]. Go read it now.

[infrant-shell-access]: http://chapados.org/2006/11/23/infrant-readynas-shell-access

2. Building a cross-compiler for the ReadyNAS using [crosstool][]

    This process is straightforward using [crosstool][] and building on x86 linux.

3. Compiling a [modified version of rsync][rsync-nl] that properly stores meta-data from HFS+ filesystems.

[rsync-nl]: http://www.lartmaker.nl/rsync/

4. Installing Python and the necessary requirements to run [rdiff-backup][]

    The ReadyNAS runs Debian Linux, and dpkg is installed.  You can download sparc packages and install them. To compile the [latest] rdiff-backup versions required for use with Mac OS X, you'll need the cross-compiler. This all works really nicely, except that it's really slow.
 
[crosstool]: http://www.kegel.com/crosstool/
[rdiff-backup]: http://www.nongnu.org/rdiff-backup/
[latest]: http://savannah.nongnu.org/download/rdiff-backup/rdiff-backup-1.1.7.tar.gz

4. For those of you that were [asking], Perl is already installed, so [rsnapshot] shouldn't be a problem, although I haven't tried it yet.

[asking]: http://www.infrant.com/forum/viewtopic.php?t=2701
[rsnapshot]: http://www.rsnapshot.org/
