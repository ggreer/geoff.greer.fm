---
date: '2015-01-15 05:36:39'
layout: post
slug: why-neovim-is-better-than-vim
published: false
title: Why Neovim is Better than Vim
categories:
- Computers
- Rant
---

I know Vim better than most. Vim was my first real editor (after [Edit](https://en.wikipedia.org/wiki/MS-DOS_Editor) and [pico](http://en.wikipedia.org/wiki/Pico_%28text_editor%29)). I used it for years. I helped write the Floobits plugin for Vim. I've delved into Vim's source code to figure out how its event loop worked. I even helped write a patch ([which was rejected](https://groups.google.com/d/msg/vim_dev/-4pqDJfHCsM/LkYNCpZjQ70J)). Considering these credentials, I hope you'll accept that I know what I'm talking about. So it may come as a shock when I say: The only good part of Vim is its user interface.

Every other aspect of Vim is irredeemable. The codebase is atrocious. The plugin API is buggy and restrictive. The community is apathetic. The benevolent dictator is averse to change. There is no chance of fixing these problems.

I wish it were otherwise, but it isn't.


### The Plugin API

Vim's plugin API is insane. First, all plugin code runs synchronously. That means if a plugin's code is executing, Vim's UI is frozen. This makes many classes of plugins difficult or impossible. Linters have to finish

Another annoyance is that writing plugins requires knowledge of vimscript. This is true even if you're using a Vim support for other languages. Sure, you'll have access to Python's libraries and syntax, but your code will be littered with calls to `vim.command()` and `vim.eval()`.

{% highlight python %}
import vim

# Show current directory in Vim
cwd = vim.eval('getcwd()')
vim.command(':Explore %s | redraw' % cwd)
{% endhighlight %}



### The Codebase

I started programming almost 20 years ago, and Vim is without question the worst codebase I have seen. Subtly-changed, copy-pasted code abounds. Indentation is haphazard. Lines contain tabs mixed with spaces. There are almost 25,000 lines in `eval.c`. It contains over 500 `#ifdef`s and references globals defined in the 2,000 line `globals.h`.

Many of these `#ifdef`s are for platforms that became irrelevant decades ago: BeOS, VMS, Amiga, Mac OS Classic, IRIX. These preprocessor statements may seem innocuous, but they slow development and inhibit new features. Also, most of these platforms don't work anymore. It's just that nobody has an ancient system with which to test them. Neovim analyzed many of the 





Even something as simple as reading keyboard input is a nightmare in Vim.

inchar in getchar.c calls ui_inchar in ui.c calls mch_inchar in os_unix.c calls WaitForChar calls RealWaitForChar

Here's a snippet from `os_unix.c`

You can view the whole thing at my [Vim Hall of WTF](/vim/#realwaitforchar).

Neovim 

<!-- `eval.c` has functions named `eval1()`, `eval2()`, `eval3()`, all the way up to `eval7()`. -->

Another fun fact: Some of Vim's source code isn't any valid encoding. It's not ASCII or UTF-8. Even the venerable [`file`](http://en.wikipedia.org/wiki/File_%28command%29) can't figure out the encoding.

    ggreer@carbon:~/code/vim% file -I src/digraph.c 
    src/digraph.c: text/x-c; charset=unknown-8bit

Amazingly, `eval.c` is pure ASCII.


### The Developer Community

Matt and I worked for months to add asynchronous functionality to Vim. From that experience, I have nothing good to say about Vim's community. In fact, Vim's developer community is the most hostile I've encountered. Anything that isn't a bug fix is frowned upon. 

The first reply to our patch was:

> NOTE: Don't use ANSI style function declarations.  A few people still have to use a compiler that doesn't support it.

C89 is a quarter-century old. The number of people stuck on older compilers can be counted on one hand. This is a non-concern.

The developer community is fragmented. Some want Vim to be similar to Sublime Text: A flexible, extensible text editor for developers. Bram and others are afraid of Vim becoming an IDE.


### The not-so-benevolent Dictator

Bram Moolenar merge criteria inscrutable. Some patches he ignores. Some, he attacks. Others, he merges.

Take a look at the thread where we submitted our patch:

We did our best to cater to his every whim, but it was a waste of time. The man simply does not understand what he's talking about.


### The Alternative

A couple of months after my disillusionment with Vim, Thiago Arruguda submitted a similar patch. It was likewise rejected. Unlike me, Thiago didn't give up. He started NeoVim and created a Bountysource project for it.



Right now you can clone Neovim, compile it, and have an editor that works with all your existing plugins. Using Neovim also unlocks some plugins that were previously impossible.

If you are a Vim user, I strongly recommend Neovim. It's everything you want, and more.
