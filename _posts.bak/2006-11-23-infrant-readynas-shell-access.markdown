--- 
title: Infrant ReadyNAS shell access
mephisto_id: 14
layout: post
---
The [Infrant][] [ReadyNAS NV][] is a great backup server or media server. However, the one critical missing feature that will make any power-user break into a cold sweat is ssh shell/root access. My initial reaction was: Huh!? I'm buying this box to store my precious data and you won't even tell me the root password or give me shell access? Dubious. I'm sure that this has driven away many potential customers. To be fair, Infrant has [promised][] to add this feature in late 2006, but it's almost December and it hasn't happened yet.

[infrant]: http://www.infrant.com
[readynas nv]: http://www.infrant.com/products/products_details.php?name=ReadyNAS%20NV
[promised]: http://www.infrant.com/forum/viewtopic.php?t=3366

As it turns out, gaining root ssh access is trivial, you just need:

1. Logs from your ReadyNAS
2. Computer with a free internal SATA port
3. Knowledge of linux
 
#### Don't try this at home kids ####

This article is *not* a step-by-step, copy-and-paste walk-through guide. If you are not comfortable working at a root prompt and have no clue about how linux is configured, then this article will not help you. My intended audience is knowledgeable users who want shell access, but have live data on their ReadyNAS boxes and can't afford to poke around and screw up their backups.

### The system partition ###

The first thing I did after unpacking the ReadyNAS (no drives installed) was to plug it, connect it directly to my laptop and turn it on. My reasoning was that if the OS runs from a flash memory card, then the system should be accessible even without any disks. This is not the case. Instead, as I had hoped, the ReadyNAS creates a system partition on one of the drives. This means that the problem is essentially the same as that one time when your friend forgot the root password to her linux box and you had to help her "break in".

#### Reconnaissance ####

If the ReadyNAS creates a system partition on a drive, where does that partition live? I'll give you a hint: Download the logs through frontview and look at them. The file called "partition.log" is a good place to start.

If the ReadyNAS could be booted from a CD and had a monitor and a keyboard, you would just need a linux boot CD and and you've have access.  It's not quite that easy, but the drives are very easy to remove. You'll just need to plug the drive with the system partition into another computer running linux. If you don't have a linux installed on the system with a SATA controller, try one of the live CDs from Ubuntu or Gentoo. These will even nicely with a PowerMac G5.

Now that you've determined where the system partition lives, shutdown your ReadyNAS and remove the drive with the system partition. Plug it in to a computer with an internal SATA controller. Turn on the computer. 

### Break in (through the unlocked front door) ###

While you were looking at the log files, you probably noticed that the system partition type is ext3, which is not surprising, since the ReadyNAS runs GNU linux. Mount the partition as ext3. That's it. You can now modify/create/delete files. However, the engineers at Infrant are clever. Enabling shell access is not as simple as modifying /etc/passwd and putting the drive back in your ReadyNAS.

### Don't steal the marked bills ###

#### .enc files ####

While you're poking around in /etc, you'll notice some files with ".enc" extensions. These are encrypted versions of the corresponding files without the extensions. The ReadyNAS updates the .enc files after you make changes to the system through frontview. The catch is that when you boot the ReadyNAS, it apparently compares each normal file with the encrypted version. If they are different, then the encrypted version is used to regenerate the normal file. This means that you won't be able to modify files that are managed by this mechanism. Trust me, I already tried it. For those following along at home, this rules out:

* /etc/passwd
* /etc/exports
* /etc/sudoers
* /etc/inittab

I'm sure we can all dream up a few ways to get around this "security" system. I used the method outlined below.

#### /root ####

Anything you add to /root appears to get removed when you put the disk back in the ReadyNAS and reboot the system.

### Set a trap ###

Since the usual targets get reset when you boot the ReadyNAS, one route of attack is to plant a trojan horse that will modify these files after the ReadyNAS boot up. Fortunately, /etc/crontab is not controlled
by the security encryption, which makes setting the trap trivial.

Write a shell script to add a user with uid = 0 if the user doesn't already exist. Add a line to /etc/crontab that executes this script as root every minute or so.

### Spring the trap ###

Once you're happy with your changes, unmount the partition, shutdown your computer, and transfer the drive back into the ReadyNAS. Turn it on and wait for it to boot up. Wait a few minutes for the cron job to execute, then login as your new root user. You'll probably want to change the configuration settings so that you can login as a normal user and enable root access via sudo.

### Cool... now what? ###

Well, now you can modify any file you want, install your favorite software, and configure everything exactly the way you want. Slow down. Before you get too excited, let's think about this for a minute:

1. The Infrant processor runs @ ~250 MHz. You're probably not going to want to run your database-backed app off of the ReadyNAS. It can barely handle ssh file transfers without maxing out the CPU.
2. The OS is a minimal version of Debian Linux. It does not have a working build environment.

Come back and look for the next article, which will cover building a sparc-linux cross-compiler with [crosstool][].

[crosstool]: http://www.kegel.com/crosstool/

#### UPDATE ####
If you arrived at this page from a search engine and you're looking for an easier way to enable ssh access that doesn't require futzing with hardware, read [this article][].

[this article]: http://chapados.org/2007/5/6/readynas-shell-access-redux
