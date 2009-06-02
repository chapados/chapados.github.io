--- 
title: ReadyNAS upgrade includes ssh access
mephisto_id: 77
layout: post
---
If anyone out there is actually checking this site for the latest info on readynas shell access, then know that this will probably be my last post about the topic. <del>Infrant</del> Netgear has finally released a beta version of [RAIDiator v4][raidiator4].  Highlights include:

[raidiator4]: http://www.infrant.com/forum/viewtopic.php?t=12671

* RAIDiator 4 is now based on Linux 2.6.
* Remote SSH for Support is disabled by default. If you wish to enable SSH access for Support, you’ll need to install the ToggleSSH add-on. 
* Root SSH support. With the EnableRootSSH add-on, you can now remote login to the ReadyNAS RAIDiator shell as a root user. Initial password for root will be the same as the current FrontView admin password. Please keep in mind that NETGEAR may deny support if you’ve enabled root access.

However, the upgrade is a one-way deal.  You can't go back to v3.x with the 2.4 kernel if something goes wrong.  Also, keep this in mind: 

> "NETGEAR Support will in no way provide support for beta releases. All support will come from this beta forum. The Jedi council will try our best to support you here, but please understand that even if have encountered legitimate bugs, bug fixes may not occur in a timely manner, and in some cases if at all. "

## Should I upgrade? ##

It depends... If you're worried about stability, then probably not.  Ironically, in terms of stability, I'm pretty sure that the info published here is probably a safer bet than upgrading to raidiator 4 if all you care about is ssh access.  They apparently redesigned frontview, but who cares if you do all your administration over ssh.  In the end, who do you trust more, me or Netgear? ;-) The choice is yours (see below if you're having a hard time deciding).

I personally have _not_ upgraded my ReadyNAS yet.  To their credit, they are already on the 3rd release of the beta.  I will probably wait until things are looking stable to apply the upgrade.

## IMPORTANT: install the Toggle SSH add-on for 3.x/4.x ##

One thing you should definitely do is close this [backdoor security hole][backdoor][1] by installing the [ToggleSSH][] add-on.  Infrant also [announced][white-lie] this vulnerability in their ssh-based backdoor.  If you connect your readynas to any kind of network, you should either disable SSH access, or login and disable root ssh login.

[backdoor]: http://www.securityfocus.com/archive/1/archive/1/476266/100/0/threaded
[ToggleSSH]: http://www.infrant.com/download/addons/ToggleSSH_1.0.bin
[white-lie]: http://www.infrant.com/forum/viewtopic.php?t=12313

[1]: I want to point out that while my name is listed first on the security advisory, practically all of the work was done by Felix.  He did some very clever and elegant work to obtain that information, and I was thrilled to be along for the ride.
