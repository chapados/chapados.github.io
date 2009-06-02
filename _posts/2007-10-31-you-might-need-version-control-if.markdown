--- 
title: You might need version control if
mephisto_id: 79
created_at: 2007-10-31 16:24:53 -07:00
layout: post
---
1. You're working on a grant or paper with collaborators and your filenames look like this (no, I'm not making this up):

    `endo07_gaz_D2edits_26oct_2pm_kih_26Oct_700pm_rick_27Oct.doc`

2. The filename would actually be longer, except that then it would exceed the 255 character limit, so you just make it more cryptic instead.  Soon you end up with files named:

    `e07gD2e26o14k26o19r27o.doc`

Version control software is not "for programmers only". If you're working on a collaborative writing project, please, pretty please, stop pretending that [good][git] [version][hg] [control][darcs] [tools][svn] do not exist and learn how to use one of them.  While you're at it, ditch word and use a real [text][textmate] [editor][emacs] that supports syntax highlighting and integrates with your version control system.  Then you can write with [markdown][] + [LaTeX][] using [Pandoc][] and save yourself and your collaborators from lots of headaches.

[git]: http://git.or.cz/
[hg]: http://www.selenic.com/mercurial/
[darcs]: http://darcs.net/
[svn]: http://subversion.tigris.org/

[markdown]: http://daringfireball.net/projects/markdown/
[latex]: http://www.latex-project.org/
[pandoc]: http://johnmacfarlane.net/pandoc/

[textmate]: http://macromates.com/
[emacs]: http://www.gnu.org/software/emacs/
