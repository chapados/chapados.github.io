--- 
title: tools matter
mephisto_id: 78
created_at: 2007-10-20 19:53:45 -07:00
layout: post
---
Lately I've been doing quite a bit of scientific writing for a grants as well as protocols for techniques in the lab.  Aside from the actual writing and thinking, this process involves:

1. Making figures and illustrations of experiments, structures and conceptual illustrations.
2. Associating text describing these figures with the actual figure.
3. Ensuring that the graphics and text created in (1) and (2) can be embedded or linked into a document that can be viewed on screen or printed.
4. Linking to appropriate references as well as figures/tables/sections of text within a document in a flexible way.
4. Sharing text and figures with collaborators.
5. Managing revisions and Incorporating changes from editors readers.
6. Not killing anyone.

There seems to be a gaping hole in software tools necessary to support the unique combination of creative and detail-oriented thinking that makes scientific writing a challenge. I don't think there is a clear cut "best-practices" work-flow for achieving steps 1-7 that everyone will agree on. People have a wide range of computer skills, ranging from "I can't figure out how to use automatic updates" to "I write software in my spare time as a hobby because it's fun".

One problem I have with the current state of affairs is that using programs like MS Word make it difficult to use anything but MS Word.  Word is like a virus in your tool chain.  If one person on a team is using it, everyone needs to deal with it somehow.  Until extremely recently, this involved also using Word.  Software like slow-to-Open Office, Google Docs and now Pages (on mac) and soon TextEdit (mac) make it possible to eliminate this dependency for simple documents.  However, for anything complex with graphics (i.e. an NIH grant) 100% compatibility is still suspect.  On the contrary, for a text-based system like [LaTeX][], everything is plain text and the only requirement is that everyone involved understands the markup language and uses software that can read and write text.

For scientific content creation, software should make it easy to:

1. Create documents by specifying semantic meaning, either with a markup language or something that converts to/from a markup language
2. Does distributed version control, with dead-easy options for sharing information with colleagues.
3. Handles cross-referencing for anything in a consistent way.

These should be core features - stuff that "just works". These can all be separate pieces, but there should be enough glue that things work together seemlessly and easily otherwise people will not use it. People should not have to shell out $100+ for yet another version of EndNote that still has bugs just to be able to format references, which is essentially a sophisticated find and replace procedure.

What bothers me is that most of the pieces exist.  LaTeX handles meaning and cross-referencing fairly well.  There are programs that convert more "writer-friendly" markup styles (like [Markdown][] to LaTeX). It should be possible to build a GUI app that reads from/writes to a subset of some useful markup language.  Right? There are numerous version control systems. As far as I can tell, any of the distributed ones (like Git/mercurial/darcs) would work well for any text-based document format. All this exists now, yet most people do not use it, because it is not easy enough to use.

Anytime you write software and you design an interface, you make choices about what should be easy to do, what is possible to do, though perhaps not easy and what can not be done. If you're smart, you manage to make things that most users want to do most of the time "easy". If you are smart and clever, you figure out a way to make easy things easy, and hard things possible. The problem is that the things that scientists need to do most of the time are _not the same_ as the things that business users need to do most of the time. Business and home users drive the sale of the most common packages.  We technical users are mostly ignored. As an example, I just installed my copy of iWork '08. When you launch the program, you are assaulted with a plethora of layouts to chose from. Unless you explicitly check a box, that screen will pop up every time you launch the program.  I think Word has something similar. Notably, Pages does _not_ support cross-references of any kind (Word does, but they are not easy to use). Clearly Apple is targeting users whose priority is to make "pretty" documents that fall into one of several standard categories. To me, aside from the fact that it opens Word docs and looks much nicer, it is ultimately useless. 

The solution is not to tell people what software to use.  If that was a viable option, we could just force everyone to use emacs, LaTeX and a version control system. What need open formats and protocols so that we can create content with the tool of our choice and the share content without worrying about the implementation details of how to do it.

Am I crazy?  I'm definitely passionate about this issue. Does ideal solution exist and I'm just out of the loop? [What do you use?][pop-quiz]

<iframe height="1658" allowTransparency="true" frameborder="0" scrolling="no" style="width:100%;border:none" src="http://chapados.wufoo.com/embed/scientific-software-pop-quiz/" title="HTML Form"><a href="http://chapados.wufoo.com/forms/scientific-software-pop-quiz/" title="HTML form">Fill out my Wufoo form!</a></iframe>
<small><a href="http://wufoo.com/">Powered by Wufoo</a></small>


[LaTeX]: http://www.latex-project.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[pop-quiz]
