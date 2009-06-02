--- 
title: Work at home with your SOCKS on
mephisto_id: 13
created_at: 2006-10-22 03:44:30 -07:00
layout: post
---
Most scientific articles are published in journals that are not freely accessible to the general public.
If you're in academic science, biotech or big pharma, your respective institutions pay the big bucks to the publishers so that you can access journal content over the internet. 
However, what about when you want to look something up at home, or access one of these resources from off site/campus? [VPN][] seems to be the typical solution these days, but I honestly think that it's overkill. Why should you run your entire networking stack through VPN, when you really only want to access a few pages through your browser? The solution: [SOCKS][].

[VPN]: http://computer.howstuffworks.com/vpn.htm
[SOCKS]: http://www.freeproxy.ru/en/free_proxy/faq/what_is_socks_proxy.htm

Publishers usually only allow access to computers within a certain IP range, which includes the computers located at your institution. Therefore, in order to read journal articles at home, we need the publisher's website to think that we're accessing their site from a computer at work. All we need in order to pull this off is a program that can implement the SOCKS protocol. SOCKS is a proxy protocol that relays information from a source computer through the proxy to  another computer. It effectively allows your computer at home to interact with the internet through your computer at work.

Unless you're using Windows, you already have the necessary tool installed on your system: ssh.  If you're using Windows, download and install a copy of [PuTTY][]. If you want something closer to *nix, download and install [Cygwin][]. Both of these are free, and IMHO, are essential software on any windows box.

[putty]: http://www.chiark.greenend.org.uk/~sgtatham/putty/
[cygwin]: http://www.cygwin.com/

## Put your SOCKS on ##

ssh is one of those extremely versatile programs with so many different features that it's hard to remember all of them off the top of your head.

To use it as a SOCKS proxy, open a terminal and type to following at the prompt (denoted by $>):

    $>ssh -ND 8080 username@host.with.access.com

If you're on windows using PuTTY, select Start -> Run, then type:

    plink -ssh -ND 8080 username@host.with.access.com

In both of these commands, the -N option prevents ssh from executing a command on the remote system, which lets you use this on systems where you can't access a shell, but can still authenticate via ssh.
The -D 8080 tells ssh to act as a SOCKS proxy server, listening on port 8080. You can use a different port if you want.

In your browser, go to the preferences, and find the proxy settings. Scroll down the list and enable the SOCKS server with these settings:

    SOCKS server settings
    host: localhost
    port: 8080
    protocol: SOCKS v5

Here are specific directions for commonly used browsers:

### Firefox ##

1. Open Firefox -> Preferences.
2. Under the "General" tab, click the "Connection settings..." button. This will bring up the proxy configuration dialog.
3. Click the "Manual Proxy Configuration" radio button.
4. Fill in the values for the SOCKS configuration as listed above.

#### Get the [Proxyswitcher][] Plug-in ###
[Proxyswitcher]: https://addons.mozilla.org/firefox/125/

This is an extremely useful tool that lets you switch between different proxy settings by clicking a button in your toolbar. I use it all the time when I need to access a journal article from home.

### Safari ##

1. Open Safari -> Preferences.
2. Under the "Advanced" tab, click the "Proxies: Change Settings" button. This actually opens the Apple System preferences pane to the proxy settings for the current network setting. Alternatively, you can access these settings, through the System Preferences: Open System Preferences, select "Network", and click on the "Proxies" tab.
3. Select the option to "Configure Proxies Manually".
4. Select the "SOCKS" proxy.
5. Fill in the settings as described above.  Don't worry about the protocol, it will automically select SOCKS v5.

### Internet Explorer ##

Sorry, I try to avoid using Windows, and when I do, I use Firefox. If somebody knows what to do, please post instructions and I will update this post.  Otherwise, I will update this section next time I'm near a Windows box.

## Cleanup ##

When you're done, kill the ssh session by pressing Ctrl+C, and reset your browser's proxy settings to directly connect to the internet.

## Before I forget... ##

In case it's not obvious, in order for this to work, you need an account with login access to a machine at your institution. If you're a *nix user, you probably already have an account and know what to do with it. If you're not sure, think about how you get your email. Do you have a shell account that lets you login to that computer? Yes? Great, use it. Still not sure, contact a systems administrator and ask about getting a shell account on one of the unix terminal servers or file servers. If they refuse, see if you can have access to an account with guest access. Any account that can authenticate via ssh will work (remember the -N option). Strictly speaking, you _do not_ need shell access.

## Fun things to do in your SOCKS ##

Obviously, accessing journal articles from remote locations is only one of several uses for this technique. SOCKS is useful whenever you need to access a service as if you were on a different computer. Utilities such as [ProxyChains][] and [tsocks][] allow you to wrap any network-based utility via a SOCKS proxy. Using SOCKS in this manner turns out to be a convenient way to acheive anonymity on the web. If this interests you, trying searching for [Onion routers][]. After that, get back to work. Isn't there some article you should be reading?

[proxychains]: http://proxychains.sourceforge.net/
[tsocks]: http://tsocks.sourceforge.net/
[Onion routers]: http://www.onion-router.net/
