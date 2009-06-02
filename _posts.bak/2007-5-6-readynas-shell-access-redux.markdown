--- 
title: ReadyNAS shell access redux
mephisto_id: 62
layout: post
---
When I wrote the original article on how to enable [shell access to the readynas][readynas-shell-access], I was motivated by the need to solve my backup problems.  Given the [unfulfilled][1] [promises][2] from [infrant][] regarding ssh availability, I was also frustrated, and wanted to share how easy it was to do it yourself. After solving solving the immediate problem, I did not try to develop a more elegant solution. Fortunately, the web is a big place, and I managed to inspire someone else to come up with a better solution that doesn't require removing any drives. This person, whom I will call "D", has asked to remain anonymous.

[infrant]: http://www.infrant.com
[readynas-shell-access]: http://chapados.org/2006/11/23/infrant-readynas-shell-access
[1]: http://www.infrant.com/forum/viewtopic.php?t=2120&highlight=
[2]: http://www.infrant.com/forum/viewtopic.php?t=3366&postdays=0&postorder=asc&start=90

## Protocol ##

Here is D's method for changing the root password:

> This is a simple approach that exploits the ability to create symbolic
> links (symlinks) while using NFS, and the ability to traverse symlinks
> while using AFP (Apple File Protocol). It also exploits the fact that
> /etc/cron.d is writeable by the admin user, which permits arbitrary
> crontabs to be created. This will probably require a Macintosh, or
> another platform which can mount AFP shares.
> 
> 1. Enable NFS and AFP services (Services -> Standard File Protocols).
> 2. Make a share NFS write-enabled and root privilege-enabled (Shares ->NFS)
> 3. Make the same share AFP write-enabled for the admin user (Shares -> AFP)
> 4. Mount the share using NFS
> 5. Create a symbolic link on the share to /etc (etc -> /etc).
> 6. Mount the share using AFP, as the admin user.
> 7. Create a new crontab file in etc/cron.d/
>
> `# example listing for /etc/cron.d/passwd`
>
> `* * * * * root /usr/sbin/usermod -p '$1$RVWNkJR9$CaniKWqUxyXC3ETsWKrCE1' root`
>
> 8. Reboot the device, to restart cron.

## Notes ##

This would not work if the backend software on the readynas was configured properly. It turns out that frontview, which is written in perl, makes system calls directly and executes commands as the admin user. To make life easier on themselves, Infrant allows the admin user to modify key system files such as /etc/cron.d. In fact, the entire frontview interface is owned by admin, so you should be able to mount /frontview that same way that you mounted /etc and modify any of the files that control the web interface. Now that [infrant has been acquired by netgear][infrant-acquired], maybe some of this will get cleaned up.  I suspect that is why infrant was promising a 4.0 release of RAIDiator that will include ssh access, and will _not_ be backwards compatible with the current versions of the OS (3.x). Sounds great, doesn't it? Given the amount of time that it takes Infrant to actually deliver on their promises lately, I think that if you want ssh access before 2008, you should probably use the method described above.

[infrant-acquired]: http://www.infrant.com/company/news_content.php?id=336
