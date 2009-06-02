--- 
title: Pier Design Tutorial
mephisto_id: 1
created_at: 2006-09-21 05:55:49 -07:00
layout: post
---
## Introduction ##
[introduction]: #intro

[Lukas Renggli][lukas] has created an amazing content management system called
[Pier][]. It's still in the alpha phase, but the functionality and flexibility
make it a truly innovative content management solution. If you've played with
wiki software in rails or php, try [Pier][] and [Seaside][] and prepare to
experience enlightenment. Currently, the default
Pier installation does not take full advantage of the capabilities of CSS. This
document describes how to build a simple theme/template for a Pier wiki starting
from an existing css framework.

[lukas]: http://www.lukas-renggli.ch
[pier]: http://www.lukas-renggli.ch/smalltalk/pier
[seaside]: http://www.seaside.st

## Disclaimer ##
[disclaimer]: #disclaimer

I'm new to [Squeak][]/Smalltalk, [Seaside][] and [Pier][].  I've learned
quite a bit over the past few months, but I'm still a newbie. As a result,
my approach might not represent the
"best practices" way of customizing Pier.  My hope is that in writing this
document, people that know more than me will read it and give me some useful
feedback.

[Squeak]: http://www.squeak.org
[Seaside]: http://www.seaside.st
[Pier]: http://smallwiki.unibe.ch/smallwiki/pier/

## Pier layout structure ##
[Pier layout structure]: #layout

Before we dive in and start writing or editing css code, let's take a look at
the style handles that Pier provides by default and how to change them.

### A brief introduction to CSS ###
Cascading StyleSheets (CSS) provide an abstraction layer for specifying the
appearance of an HTML document. It's beyond the scope of this document to
explain the intricacies of css.  Instead, you should check out:
- [A-list-apart](http://www.alistapart.com)
- [Eric Meyer's site](http://www.meyerweb.com)
- [Simplebits][]
- and of course, [google](http://www.google.com)

If you collect computer books for a hobby, you should buy
[Bulletproof Web Design][bulletproof] by [Dan Cederholm][simplebits].

[simplebits]: http://www.simplebits.com
[bulletproof]: http://www.amazon.com/o/ASIN/0321346939

#### What you need to know about CSS ####
For now, suffice it to say that CSS allow you to specify the appearance of any
HTML tag.  They also provide "class" and "id" elements that are used to create
a hierarchy of style commands. As a general rule of thumb, use an "id" when
there is only one occurrence of the object per page. Use a "class" when there
are one or more occurrences per page.

Given this general rule, you can get a very good idea of where to start
customizing the layout of a page/site by looking through the HTML source for
`<div id="...">` and `<div class="...">` tags.

### Pier layout ###

Pier uses the [Seaside][] web framework. Compared to other web frameworks,
Seaside is a [web heretic][heretic] that breaks several conventional rules.
For example, most designers are probably used to working with templates
containing a mixture of HTML and framework-specific code. Seaside applications
use an API to generate HTML. There are no templates. That's right, no
templates. This means that as a designer, you only need to worry about the stylesheets.
This section provides an overview of the default HTML structure provided by
Pier, and how to customize it.

[seaside]: http://www.seaside.st
[heretic]: http://conferences.oreillynet.com/cs/os2006/view/e_sess/8942

#### General outline of a page ####
Pier currently uses classes under the #frameContent id to control the style of
different page elements. In css code, '#' is the prefix for ids, and '.' is
the prefix for classes.

    #frameContent
        .frame
        .header
        .box .views
        .box .commands
        .box .tree
        .content

In Seaside and Pier, the "pages" that are rendered in your browser are made
up of several components. In Pier, the main layout components are embedded in a
special page component called the 'environment'. It's normally hidden, but you can
access it by typing it in the location bar of you browser. In the default case
(above), the environment contains header, box->view, box->command, box->tree
and content components. The view, command and tree components are actually
subclasses of the box component, so they inherit the default css settings from
that class.

#### Changing the css parameters of a Pier component ####
You can easily change the default values. For example, let's say you would rather
specify the header using an id (#header) instead of a class (.header)
1. navigate to environment/header
2. click on the 'settings' link under commands
3. add the text "header" to **CSS Name**. Note that the **CSS Name**
   field controls the `<div id>` name.
4. delete the text for **CSS Class**
5. click the 'save' button

#### Where do the default values come from ####
Pier components are subclasses of PRWidget. Continuing our previous example,
here is the class heirarchy for PRHeaderWidget:

    ProtoObject
      Object
        WAPresenter
          WAComponent
            MAComponent
              PRWidget
                PRBoxWidget
                  PRListWidget
                    PRCommandsWidget
                      PRHeaderWidget

and the class methods for PRHeaderWidget:

    PRHeaderWidget class
      defaultCommandClasses
      defaultCssClass
        ^ 'header'
      defaultTitle
        label

Notice that defaultCssClass returns the string "header".  You can change the default value
by changing this string. I'll leave it as an exercise for you to explore the
rest in detail. (Hint: defaultCssName appears as a class method of PRBoxWidget.)

## Don't work too hard: Get a template ##

[Don't work too hard: Get a template]: #css-template

Unless you're a seasoned web designer, there's a good chance that you probably
won't create an ideal css template from scratch on the first try. Like the
scaffolds created by generators in [Ruby on Rails][rails], having a good outline
for your css files will get you started down the right path, and help you
avoid mistakes. Furthermore, you can avoid several cross-browser css compatibility
issues by finding a good starting framework.

[rails]: http://www.rubyonrails.com

### Look for design contests ###
Design contests are a great source for CSS templates. The quality varies, but
it's usually high.  Many of the designers are trying to make a name for
themselves, so their entries are probably worth hundreds to thousands of dollars
in development time.  Think of  design competition sites as a repository for
high-quality, open-source css. However, be sure to double-check that you are legally
using a theme/design, and give the author credit!

Here are a few design contest sites to get you started:
- [Typogarden][]: themes for [Typo][], a [Ruby on Rails][rails]-based blogging app.
- [Textplates][]: themes for [Textdrive][], a php-based CMS.

[typo]: http://www.typosphere.org
[typogarden]: http://www.typogarden.org
[textdrive]: http://textplates.com
[textplates]: http://textplates.com

### Find a template ###
One of my favorite design-theme/frameworks is [Scribbish][], a css framework and typo
theme designed by Jeffrey Allan Hardy at [Quoted-Printable][]. Scribbish
has a simple, yet elegant appearance, which is mirrored in the css
framework. There are separate stylesheets that control different components of
the page, making this theme easy to understand and modify to fit Pier, or any site.
Before continuing, go read about the [css framework][css-framework] used by scribbish,
I'll wait.

Sounds good, right? Download the [latest version][scribbish-download]
of [Scribbish][], expand the tar file and take a look at the source code.

[scribbish]: http://www.quotedprintable.com/pages/scribbish
[quoted-printable]: http://www.quotedprintable.com
[css-framework]: http://www.quotedprintable.com/articles/read/19
[scribbish-download]: http://www.quotedprintable.com/files/scribbish-1.2.tar.gz

### Modify scribbish for use with Pier ###
Before we tell Pier about the new css files, we need to change a few things so
that scribbish works correctly outside of its native Typo environment.

#### Use relative paths ####
All references to 'url's in all the stylesheets are hard-coded to work with
[Typo][].  For example, in scribbish/stylesheets/application.css,
the body tag looks like:

    body {
        background: url(/images/theme/background.gif) repeat-x left top;
        font: normal 12px "lucida grande", verdana, arial, helvetica, sans-serif;
    }

You could hard code a new url, but for now I recommend just using a relative url:

    background: url(../images/background.gif) repeat-x left top;

Find all the references to absolute paths change them to relative paths.

#### Deal with tables and textareas ####
Pier still uses tables in a few places. Whenever you edit a page, the form
generated by Magritte uses tables.  I haven't figured out how to change this
yet.  For now, we'll work around it.

Unless the table width is set to 100%, the width of your textareas will be
constrained by the table width, rather than the width of the 'content' div.
To ensure that your forms use the full allowable width, and have reasonable
height, add the following code to the bottom of content.css:

    #content textarea {
        width: 100%;
        height: 300px;
    }
    
    #content table.container {
        width: 100%;
    }

## Configure Comanche to serve files ##
[Configure Comanche to serve files]: #kom-config

If you look closely at your default Pier installation, you'll notice that you
are using css stylesheets from [here][pier-css]. We want to use our own custom
stylesheets. There are multiple ways of accomplishing this goal.  You can put
the stylesheets at any web-accessible URL and reference them.  If you running
Pier behind a proxy front-end, then you can just put them somewhere in your
root directory and refer to them.  If you know how to setup Seaside Style
Libraries (I haven't tried this yet) then you can just do that. The solution I chose was to
configure Comanche to serve files.  This allows me to keep the stylesheets
outside of my Squeak image. Right now I find this easy since I'm used to working
this way.

[pier-css]: http://www.lukas-renggli.ch/smalltalk/pier/style/84/style.css


### The default configuration ###
If you followed the instructions for [installing Pier][install-pier] posted on
the [Smallwiki site][pier] or the instructions for
[installing Seaside][install-seaside] from the [Seaside][] home page,
then Comanche is not configured to serve static files.

[install-pier]: http://smallwiki.unibe.ch/smallwiki/pier/installationofpier/
[pier]: http://smallwiki.unibe.ch/smallwiki/pier/
[install-seaside]: http://www.seaside.st/Download/
[seaside]: http://www.seaside.st

### The new configuration ###
Fortunately, all of the necessary changes are summarized nicely in the
[Getting Software][shaffer-kom] section of David Shaffer's
[Seaside tutorial][shaffer-seaside]. For completeness, I'm posting the exact
same code here, but all credit goes to [David Shaffer][shaffer].

[shaffer]: http://www.shaffer-consulting.com/
[shaffer-seaside]: http://www.shaffer-consulting.com/david/Seaside/
[shaffer-kom]: http://www.shaffer-consulting.com/david/Seaside/GettingSoftware/index.html

Rather than starting Comanche like this:

    WAEncodedKom startOn: 8080.

Kill any existing server instances with this command:

    "Kill all existing Kom HTTP servers"
    HttpService allInstancesDo: [:each | each stop. each unregister].

And then start Comanche with these options:

    "Start a new server on port 8080 servering both static content and seaside apps"
    | ma seaside |
    seaside := WAKom default.
    ma := ModuleAssembly core.
    ma serverRoot: (FileDirectory default directoryNamed: 'FileRoot') fullName.
    ma alias: '/seaside' to: [ma addPlug: [:request | seaside process: request]].
    ma documentRoot: (FileDirectory default directoryNamed: 'FileRoot') fullName.
    ma directoryIndex: 'index.html index.htm'.
    ma serveFiles.
    (HttpService startOn: 8080 named: 'httpd') plug: ma rootModule

Note that the directory 'FileRoot' can be called anything you want.  You'll
need to put that directory in the same folder as your Squeak image file.

## Customize your Pier environment ##
[Customize your Pier environment]: #pier-environment

Although I recommend more changes to the css stylesheets, those minor edits are
the only changes that you have to make. To use the new stylesheets, we need to
give Pier the path to 'application.css', and modify the environment to
reflect the scribbish layout structure.

### Use the new stylesheets ###
To make Pier use the new stylesheets, just change PRStyleLibrary>>style as follows:

    PRPierLibrary>>style
        ^ '@import "/scribbish/stylesheets/application.css";'

Note that if you started Comanche prior to adding scribbish 
underneath the 'FileRoot' directory, you might have to restart Comanche before
the stylesheets will be recognized.

### Edit the environment ###
With the new stylesheets in place, the pages will look strange because the Pier
layout structure does not match the css design. To fix this, you need to edit
the environment. Access it by typing it in the navigation bar of your browser,
or clicking [here][environment], if you're following this tutorial.

[environment]: http://localhost:8080/seaside/pier/environment

#### A new environment ####

    <div id="container">
    +header++views++path+
    <div id="page">
    <div id="content">+main+</div>
    <div id="sidebar">+search++tree++commands+</div>
    </div>
    <div id="footer">Pier &mdash; Empowered by Seaside</div>
    </div>


##### Set the default environment #####

The default environment is returned by the method
PRStructure>defaultEnvironment. To add new default components, just add
children to the the environment Page (a PRPage instance). To change the
environment contents, change the string for the 'contents:' parameter. Here
is an example of a new default environment that adds a path component
under the header, and a search component in the sidebar.

    PRStructure>environmentStructure
        ^ (PRPage named: 'environment')
                addDecoration: PRHider new;
                addChild: ((PRComponent named: 'header')
                        componentClass: PRHeaderWidget;
                        yourself);
                addChild: ((PRComponent named: 'path')
                        componentClass: PRPathWidget;
                        yourself);
                addChild: ((PRComponent named: 'views')
                        componentClass: PRViewsWidget;
                        yourself);
                addChild: ((PRComponent named: 'search')
                        componentClass: PRSearchWidget;
                        yourself);
                addChild: ((PRComponent named: 'commands')
                        componentClass: PRCommandsWidget;
                        yourself);
                addChild: ((PRComponent named: 'tree')
                        componentClass: PRTreeWidget;
                        yourself);
                addChild: ((PRComponent named: 'main')
                        componentClass: PRContentsWidget;
                        yourself);
                contents: '<div id="container">+header++path++views+<div id="page"><div id="content">+main+</div><div id="sidebar">+search++tree++commands+</div>
    </div><div id="footer">Pier &mdash; Empowered by Seaside</div></div>';
                yourself

This new environment will be used whenever you create a new kernel. To reset
your kernel (this will destroy all data):

    "Reset Pier Kernel"
    PRKernel reset. PRPierFrame initialize.

#### Customize components ####

The new environment defines some new components, and uses familiar components
(i.e. views) in a new way. In this scenario, the header, path and view components
are intended to be laid out horizontally across the top of the page, before
the "page" and "sidebar" content. In my customized [scribbish][] layout, 
each component has a corresponding #id or .class
to provide complete control over the style. The default component settings
in Pier use classes, so you'll either have to change the component
'settings' after adding the component, change the code to set
new defaults, or change your stylesheet to fit the Pier defaults. For example,
the default path widget has a title that gets in the way when the path is
displayed as an inline list. You might also want to hide the icons by default.
The Pier UI components that you add to each page are subclasses of PRWidget.
Thus, to change the default settings of the path component,
add class methods to PRPathWidget.

[scribbish]: http://www.quotedprintable.com/pages/scribbish

    PRPathWidget>defaultTitle
            ^ nil

    PRPathWidget>defaultShowIcons
        ^ false

    PRPathWidget>defaultCssName
        ^ 'path'

#### Custom Header component ####

The default Pier header uses tables.

    PRHeaderWidget>renderWidgetOn: html
    html table
        class: 'header';
            with: [
                self renderLogoOn: html.
                self renderSpacerOn: html.
                self renderTitleOn: html ]

Let's change the header to look like a simple blog or wiki: get rid of the
table, and add a subtitle.  On the instance side, add methods to get, set and
render the subtitle.  Then modify renderWidget on to render both the title and
subtitle.

    renderWidgetOn: html
        self renderTitleOn: html.
        self renderSubtitleOn: html
        
    renderSubtitleOn: html
        html heading level: 2; with: (self expand: self subtitle).
        
    subtitle
        ^ self propertyAt: #subtitle ifAbsent: [ self class defaultSubtitle ]
        
    subtitle: aString
        self propertyAt: #subtitle put: aString

On the class side, add a method for the description and the default subtitle
(a new string).

    defaultSubtitle
        ^ String new
        
    descriptionSubtitle
        ^ MAStringDescription selector: #subtitle label: 'subtitle' priority: 120 default: self     defaultSubtitle

#### CSS class controls for inline lists ####

Inline lists are a versatile design technique that allow the use
of lists to control horizontal layout (see [CSS Design: Taming Lists][taming-lists]).
With this techinque, lists can be used to create menu bars and context bars.
To control the style of inline lists, it is
often convenient to designate the first and/or last item of the list using a
class. This allows these items to be styled differently than items in the
middle of list, providing a convenient mechanism for creating a path string
separated by slashes, or a menu bar separated by lines.

[taming-lists]: http://www.alistapart.com/articles/taminglists/

Although we could make these properties configurable, simply hard-coding them
to always be "first" and "last" should work for 99% of all cases.
To add this capability, modify PRListWidget>renderItems.
        
    renderItems: aCollection on: html
        html unorderedList with: [
            aCollection do: [ :each |
                html listItem 
                    class: (aCollection first = each ifTrue: [ 'first' ]);
                    class: (aCollection last = each ifTrue: [ 'last' ]);
                    class: (self selected = each ifTrue: [ 'active' ]);
                    with: [ self renderItem: each on: html ] ] ]

### Add a context bar ####

Now that we can uniquely render the first and last items of a list, it's easy
to add a context bar.  Just add a path component to the environment. Under the
settings for environment/path, add a custom **CSS name**. Then, use css to
render the path as an inline list, adding a '&#187;' (`&#187;`) or '/' character before
each item except the first. To add this change into the scribbish framework,
we'll add #path to the layout, and create a new component.css file to handle
the the style settings for #path and other Pier components.

Since path is a floating element, we need to make sure that all of the floats
are cleared before rendering the page content, by adding 'clear: both;' to
the top of the #page style.

Make changes to layout.css

    #path {
        padding: 0px;
        margin-bottom: 0px;
        float: left;
    }

    #page {
        clear: both;
        /* ... page settings here ... */
    }

create component.css (based on code from *CSS Design: [Taming Lists][taming-lists])

    #path {
        /* additional custom path styles here */
    }
    
    #path ul {
        margin-left: 0;
        padding-left: 0;
        display: inline;
        border: none;
    }
    
    #path ul li {
        margin-left: 0;
        padding-left: 2px;
        border: none;
        list-style: none;
        display: inline;
    }
    
    #path ul li.first {
        margin-left: 0;
        padding-left: 0px;
        border: none;
        list-style: none;
        display: inline;
    }
    
    #path ul li:before {
        content: "\0020 \0020 \0020 \00BB \0020";
    }
    
    #path ul li.first:before {
        content: "";
    }

Add a reference to component.css in application.css
just above the 'local.css' reference, so that component
styles override any default settings. 

    @import 'component.css';


## P is for paragraphs ##
[P is for paragraphs]: #paragraphs

Lukas recently changed the way paragraphs are rendered in Pier from using `<p>`
tags to `<div class="paragraph">`. This change first appeared in
Pier-lr.83. The monticello comments say something about the `<p>` element causing
problems with nested pages.  Unfortunately, the change to
`<div class="paragraph">` completely breaks the scribbish theme.  
Currently, I'm using `<p>` elements with one level of nesting and I haven't
noticed any problems.

To use normal `<p>` elements, change PRViewRenderer>visitParagraph to

    visitParagraph: anObject
        html paragraph with:  [ super visitParagraph: anObject ]

Please note that it might be possible to fix this problem by using specifying
properties for `<div class="paragraph">` that will make it behave like `<p>`.  If
anyone knows how to do this, please let me know.

## Get the code ##
[Get the code]: #code

I haven't covered every Pier and css modification in detail. Rather, I tried
to provide example cases that highlight the types of changes you can make
to add some style to Pier. To provide a finished example, you can download
my version of a default Pier installation (Pier-all-lr.87) styled along with
my modified version of scribbish (version 1.2).

### Files ###

- [Pier Design Tutorial image+changes][pier-image]  
  Squeak (3.8) .image and .changes files loaded with Seaside 2.6a3, Pier-All-lr.87 plus all
  the necessary dependencies.

- [pier-scribbish-1.2][]  
  Scribbish 1.2 distribution containing changes described in this tutorial and
  a few other modifications for Pier.

[pier-image]: /download/pier-design-tutorial.tar.gz
[pier-scribbish-1.2]: /download/pier-scribbish-1.2.tar.gz
