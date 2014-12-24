---
date: '2014-12-15 05:36:39'
layout: post
slug: why-neovim-is-better-than-vim
published: true
title: Why Neovim is Better than Vim
categories:
- Computers
---

I should start by saying that I know Vim better than most. Vim was my first real editor (after [Edit](https://en.wikipedia.org/wiki/MS-DOS_Editor) and [pico](http://en.wikipedia.org/wiki/Pico_%28text_editor%29)). I helped write the Floobits plugin for Vim. I've delved into Vim's source code to figure out how its event loop worked. I even helped write a patch (which was rejected). Considering these credentials, I hope you'll accept that I know what I'm talking about. So it may come as a shock when I say: The only good part of Vim is its user interface.

Every other aspect of Vim is irredeemable. The codebase is atrocious. The plugin API is buggy and restrictive. The community is apathetic. The benevolent dictator is averse to change. There is no chance of fixing these problems. I wish it were otherwise.





Matt and I have worked for months to add asynchronous functionality to Vim. In this time, I have found nothing good to say about Vim or its community.


### The Plugin API

Vim's plugin API is insane. 


### The Codebase

Vim is without question the worst codebase I have seen. I learned C 16 years ago. I have never seen such an abysmal, neglected codebase. Copy-pasted code abounds. Worse, there are many chunks of copy-pasted code that are subtly changed.

Lines contain tabs mixed with spaces.

There is a file called `eval.c`. It is almost 25,000 lines. It contains over 500 `#ifdef`s. It references globals defined in the 2,000 line `globals.h`.


"NOTE: Don't use ANSI style function declarations.  A few people still have to use a compiler that doesn't support it."



Not even the venerable [`file`](http://en.wikipedia.org/wiki/File_%28command%29) can figure out the encoding.

    ggreer@carbon:~/code/vim% file -I src/digraph.c 
    src/digraph.c: text/x-c; charset=unknown-8bit

Amazingly, `eval.c` is pure ASCII.


### The Developer Community

Vim's developer community is the most hostile I've encountered. 


### The not-so-benevolent Dictator

Bram Moolenar is inscrutable. Some patches he ignores. Some, he attacks. Others, he merges.

Take a look at the thread where we submitted our patch:

We did our best to cater to his every whim, but it was a waste of time. The man simply does not understand what he's talking about.
