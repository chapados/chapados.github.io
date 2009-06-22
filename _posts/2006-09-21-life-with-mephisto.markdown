---
layout: post
title: Life with Mephisto
tags: [cms, mephisto, rails]
mephisto_id: 8
created_at: 2006-09-21 06:46:08 -07:00
---
No, I'm not talking about the [demon][mephistopheles]. I'm not living in hell, yet. I'm talking about the hot, new [blogging cms app][mephisto] that all the [cool kids][mephisto-users] are using. I've finally upgraded this site to use some modern technology. If you're one of the ~100 people who has actually viewed this page in the past couple months, then congratulations, you're seeing something new! For the rest of you, trust me, it's better now.

For those of you who don't know, mephisto is a [ruby-on-rails][rails] app. Here's where I stand as far as the hybrid blog+website setup is concerned:

I'm running the trunk version of [mephisto][], which is upgraded practically everyday - go [techno-weenie][]! To keep up with the changes, I'm using [SVK][] and [subversion][svn] as described by [octopod][]. Pages are served up with [mongrel][] and [apache][] on a linux vserver. I even setup a one-step deployment procedure using [capistrano][] to move changes from my classic [Powerbook G4 Titanium][pbg4] to the vserver.  What's that? I've spilled some kool-aid on my shirt? Thanks, I didn't even notice.

Overall, I'm happy with mephisto for now.  I get the following wrapped up in a nice package with a bow:
* write text in [markdown][]
* do basic version control
* easily manage non-blog areas of the site
* manage files/images using the assets system

For those interested, in the past I've also evaluated [radiant][], [pier][], and also [xowiki][] from [openacs][], but ultimately chose mephisto.  Here's a brief summary:

Radiant seemed like a great option at first, and it powers the [Ruby site][], so it is clearly capable.
However, after some basic testing, reading the mailing list archives, and checking out the "plugin" system, I got the impression that despite the slogan, radiant has not clearly defined what it's trying to be. I guess the core of radiant is fairly simple, but it's missing enough features that I wanted (comments, asset management, and basic version control) that I decided to pass for now.

[ruby site]: http://www.ruby-lang.org

I'm blown away by Pier, and I can envision using it at some point. At this point, I decided against it because it doesn't support markdown, and the object database persistancy mechanism is still being developed. Still, I think the concept of storing pages as objects is much cleaner than markup text in a database, and will ultimately be more flexible. Also, Pier is written in [Seaside][], so you can integrate it into an existing Seaside app or embed a Seaside app into Pier. Try doing that with rails. Unfortunately, as stupid as this might sound, one of the things I don't like about using pier for a CMS app is the external URLs. Since seaside is a continuation-based framework, the URLs store the continuation key. This looks ugly and also breaks the cache/history feature of your browser that denotes which links have already been visited. These are minor concerns for Applications that run in a browser. However, in my opinion , this situation is not ideal for a content-heavy site.

[Seaside]: http://www.seaside.st

[OpenACS][] is the first web development framework that I ever used. 
I never used it for a public site, but I was inspired by [Phil Greenspun][]'s [book][] and [problem sets][]. I also followed the success and demise of [Arsdigita][] while I was in grad school. As far as I can tell, (Open)ACS was the original "opinionated" web framework: "use AOLserver+Tcl and Oracle/Postgres and make the db do your heavy lifting, because [SQL is easy][sql]."  Despite the fact that there are several out-dated packages, the core of OpenACS still has some well-designed pieces. The [xowiki][] package is very cool, but it's just not as easy to setup, maintain or use as the other two options.

[openacs]: http://openacs.org
[phil greenspun]: http://phillip.greenspun.com
[book]: http://philip.greenspun.com/panda/
[problem sets]: http://philip.greenspun.com/teaching/psets/
[Arsdigita]: http://www.eveandersson.com/arsdigita/
[xowiki]: http://media.wu-wien.ac.at/download/xowiki-doc/
[sql]: http://philip.greenspun.com/sql/

With Mephisto, you know where you stand.
Mephisto is a blogging app first, and can also handle simple pages with comments.
For the most part it does what you expect it to do, and it doesn't try to be all things to all people. I give it a thumbs up.

[mephistopheles]: http://en.wikipedia.org/wiki/Mephisto
[rails]: http://rubyonrails.com/
[mephisto]: http://mephistoblog.com
[techno-weenie]: http://weblog.techno-weenie.net/
[svk]: http://svk.elixus.org/
[svn]: http://subversion.tigris.org/
[octopod]: http://octopod.info/2006/8/19/managing-multiple-local-mephisto-repos-with-svk
[mongrel]: http://mongrel.rubyforge.org/
[apache]: http://httpd.apache.org/
[capistrano]: http://manuals.rubyonrails.com/read/book/17
[markdown]: http://daringfireball.net/projects/markdown/
[radiant]: http://radiantcms.org
[pier]: http://smallwiki.unibe.ch/smallwiki/pier/
[pbg4]: http://en.wikipedia.org/wiki/PowerBook_G4#Titanium_PowerBook_G4
[mephisto-users]: http://mephisto.stikipad.com/help/show/Blogs+and+Sites+running+Mephisto
