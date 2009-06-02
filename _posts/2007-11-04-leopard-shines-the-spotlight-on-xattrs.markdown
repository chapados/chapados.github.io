--- 
title: Leopard shines the spotlight on xattrs
mephisto_id: 80
created_at: 2007-11-04 19:35:32 -08:00
layout: post
---
When Tiger was released back in 2005, Spotlight search technology was all the rage.  Several articles appeared showing off the technology and [explaining the details][spotlight-details]. For most people, being able to easily find their files was all they cared about.  Others thought it was too slow and immediately disabled it.

[spotlight-details]: http://arstechnica.com/reviews/os/macosx-10-4.ars/9

If you're a geek like me, you probably got excited when [Amit Singh][singh] explained how to use the undocumented [fsevents API][fs_events] to monitor spotlight events directly. However, although spotlight in Tiger monitors basic file activity, it ignored [xattrs][] (extended attributes).  This matters, because extended attributes have major potential to store arbitrary metadata on files.  Ever wanted to be able to tag your files?  Maybe you've used one of the existing Finder-comment [hacks][], or a more elegant solution like [Tagbot][].  Perhaps you've experimented with [spotmeta][], a project started by Ben Summers that made extended attributes searchable through spotlight. In Tiger, this was difficult, since the fs_event system did not monitor changes to extended attributes. A quick look through the [bsd kernel source code][kernel] shows that this has changed in Leopard:

[singh]: http://kernelthread.com/
[xattrs]: http://arstechnica.com/reviews/os/macosx-10-4.ars/7
[fs_events]: http://www.kernelthread.com/software/fslogger/
[spotmeta]: http://www.fluffy.co.uk/spotmeta/
[kernel]: http://www.opensource.apple.com/darwinsource/10.5/xnu-1228/
[hacks]: http://lifehacker.com/software/tags/metadata-as-a-filing-system-169971.php
[Tagbot]: http://bigrobotsoftware.com/

(from xnu/bsd/sys/fsevents.h)
    
    // Event types that you can ask to listen for
    #define FSE_INVALID             -1
    #define FSE_CREATE_FILE          0
    #define FSE_DELETE               1
    #define FSE_STAT_CHANGED         2
    #define FSE_RENAME               3
    #define FSE_CONTENT_MODIFIED     4
    #define FSE_EXCHANGE             5
    #define FSE_FINDER_INFO_CHANGED  6
    #define FSE_CREATE_DIR           7
    #define FSE_CHOWN                8
    #define FSE_XATTR_MODIFIED       9
    #define FSE_XATTR_REMOVED       10

    #define FSE_MAX_EVENTS          11
    #define FSE_ALL_EVENTS         998

    #define FSE_EVENTS_DROPPED     999

Leopard adds the `FSE_XATTR_MODIFIED` (9) and `FSE_XATTR_REMOVED` (10) events, making it possible to monitor changes to extended attributes. This might seem like no big deal. However, this opens the door to building custom metadata solutions and integrating them directly into the operating system.  I haven't installed Leopard yet, so I'm not sure if Apple is utilizing this underlying technology for anything in Leopard. I checked the online [Spotlight metadata attributes][mdattrs], and there is nothing obvious to suggest that Spotlight is making custom extended attributes easily searchable through the MDQuery API.  Apple has a habit of adding features to the kernel in preparation for use in later versions of the OS (cough*autofs).  This little gem of a feature could bring a project like [spotmeta][] back to life, or inspire a new round of xattr-based metadata solutions.  Stay tuned for more information on this topci after I have time to install Leopard.

[mdattrs]: http://developer.apple.com/documentation/Carbon/Reference/MetadataAttributesRef/index.html#//apple_ref/doc/uid/TP40001689

(07-dec-2007 update: fixed a few typos)
