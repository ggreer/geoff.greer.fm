---
date: '2015-01-15 05:36:39'
layout: post
slug: why-neovim-is-better-than-vim
published: true
title: Why Neovim is Better than Vim
categories:
- Computers
- Rant
---

I know Vim better than most. Vim was my first real text editor.<sup>[\[1\]](#ref_1)</sup> I used it for years. I helped write the [Floobits plugin for Vim](https://github.com/Floobits/floobits-vim). I've delved into Vim's source code to figure out its workings. I even [helped write a patch](https://groups.google.com/d/msg/vim_dev/-4pqDJfHCsM/LkYNCpZjQ70J) (though it was rejected). Considering these credentials, I hope you'll accept that I know what I'm talking about.

It may come as a shock when I say: The only good part of Vim is its user interface.

Every other aspect of Vim is irredeemable. The codebase is atrocious. The plugin API is cumbersome and restrictive. The dev community is apathetic. The benevolent dictator is averse to change. There is no chance of fixing these problems.

I wish it were otherwise, but it isn't.

Considering the degree of these criticisms, I should back them up with specific examples.


### The Plugin API

Vim's plugin API is just plain bad. First, all plugin code runs synchronously. That means if any plugin's code is executing, Vim's UI is frozen. This makes many types of plugins difficult or impossible to implement. Linters have to finish in milliseconds or risk annoying the user. External commands (such as `make`) can't be cancelled, and they must finish before the user can resume editing.

Another annoyance is that writing plugins requires knowledge of Vim's special language: vimscript. This is true even if you're using a Vim compiled with support for other languages. Yes, `+python` gives you access to Python's libraries and syntax. But your code will be littered with calls to `vim.eval()` and `vim.command()`. Here's an example:

{% highlight python %}
import vim

# Show current directory in Vim
cwd = vim.eval('getcwd()')
vim.command(':Explore %s | redraw' % cwd)
{% endhighlight %}

You might notice that issues could arise from failing to properly escape variables in calls to `eval()` and `command()`. You'd be right. It's not uncommon for special character inputs to cause Vim plugins to crash or misbehave.


### The Codebase

I started programming in C almost 20 years ago. Vim is, without question, the worst C codebase I have seen. Copy-pasted but subtly changed code abounds. Indentation is haphazard. Lines contain tabs mixed with spaces. Source files are *huge*. There are almost 25,000 lines in `eval.c`. That file contains over 500 `#ifdef`s and references globals defined in the 2,000 line `globals.h`.

Some of Vim's source code isn't even valid text. It's not ASCII or UTF-8. The venerable [`file`](http://en.wikipedia.org/wiki/File_%28command%29) can't figure out the encoding.

    ggreer@carbon:~/code/vim% file -I src/digraph.c 
    src/digraph.c: text/x-c; charset=unknown-8bit

Thankfully, `eval.c` is pure ASCII.

Many of Vim's `#ifdef`s are for platforms that became irrelevant decades ago: BeOS, VMS, Amiga, Mac OS Classic, IRIX. These preprocessor statements may seem innocuous, but they slow development and inhibit new features. Also, Vim doesn't even work on most of these platforms anymore. It's just that nobody has an ancient system with which to test Vim. Neovim developers analyzed many of the preprocessor statements and [found a significant number that could never be included](https://github.com/neovim/neovim/pull/814) in a working Vim.

Complexity stemming from cross-platform support may be excusable, but even something as simple as reading keyboard input is a nightmare in Vim. Stepping through with a debugger will result in call stacks such as `inchar()` in `getchar.c` calling `ui_inchar()` in `ui.c`, which calls `mch_inchar()` in `os_unix.c`, which calls `WaitForChar()`, which calls `RealWaitForChar()`. This call stack can be completely different on different platforms. It also differs when running in command line versus GUI mode.

Figuring out Vim's control flow is harrowing. Even when you hit paydirt in `RealWaitForChar()`, the code is extremely hard to follow. Here's a snippet. You can view the whole function at my [Vim Hall of WTF](/vim/#realwaitforchar).

{% highlight c %}
# if defined(HAVE_GETTIMEOFDAY) && defined(HAVE_SYS_TIME_H)
    /* Remember at what time we started, so that we know how much longer we
     * should wait after being interrupted. */
#  define USE_START_TV
    struct timeval  start_tv;

    if (msec > 0 && (
#  ifdef FEAT_XCLIPBOARD
        xterm_Shell != (Widget)0
#   if defined(USE_XSMP) || defined(FEAT_MZSCHEME)
        ||
#   endif
#  endif
#  ifdef USE_XSMP
        xsmp_icefd != -1
#   ifdef FEAT_MZSCHEME
        ||
#   endif
#  endif
#  ifdef FEAT_MZSCHEME
    (mzthreads_allowed() && p_mzq > 0)
#  endif
        ))
    gettimeofday(&start_tv, NULL);
# endif
{% endhighlight %}

That `if` statement's conditions span 17 lines and 4 different `#ifdef`s. All to call `gettimeofday()`. Amusingly, even the body of that statement has a bug: times returned by `gettimeofday()` are not guaranteed to increase. User intervention or ntpd can cause the system clock to go back in time. The correct solution is to use a monotonically increasing time function, such Linux's `clock_gettime()` or OS X's `mach_absolute_time()`.


### The Developer Community

[Matt](https://github.com/kans) and I worked for months to [add asynchronous functionality to Vim](https://news.floobits.com/2013/09/17/adding-settimeout-to-vim/). From that experience, I have few good things to say about Vim's dev community. In fact, out of all the developer communities I've encountered, Vim's is the most hostile to change. Anything that isn't a bug fix is frowned upon.

Patches are often criticized for ridiculous reasons. After we [posted our patch to the Vim-dev mailing list](https://groups.google.com/d/msg/vim_dev/-4pqDJfHCsM/LkYNCpZjQ70J), the first reply was:

> NOTE: Don't use ANSI style function declarations. A few people still have to use a compiler that doesn't support it.

Seriously? C89 is a quarter-century old. The number of people stuck on older compilers can be counted on one hand. This is a non-concern. Still, I acquiesced. It was easier to make the change than argue with the critic.

The rest of that thread is me being as civil as possible, despite discouragement at every turn. The replies might as well be a paint-by-numbers guide on how to alienate new contributors.

On a more general note: After reading random posts on the Vim-dev mailing list, I get the impression that the developer community is fragmented. Some want Vim to be similar to [Sublime Text](http://www.sublimetext.com/): A flexible, extensible text editor for developers. Some (including [BDFL](http://en.wikipedia.org/wiki/Benevolent_dictator_for_life) Bram Moolenaar) are afraid of Vim becoming an IDE.


### The Overly Cautious Dictator for Life

Speaking of Bram Moolenaar: His merge criteria are inscrutable. Some patches he ignores. Some, he attacks. Others, he merges.

Take a look again at [the thread where Matt and I submitted our patch](https://groups.google.com/d/msg/vim_dev/-4pqDJfHCsM/LkYNCpZjQ70J). We did our best to cater to Bram's every whim, but it was a waste of time. Had he immediately told us to give up, it would have been a better outcome for all involved. Instead, we were given hope and strung along, working on a patch that had no chance of getting merged.


### The Alternative

A couple of months after my disillusionment with Vim, [Thiago Arruguda](https://github.com/tarruda) [submitted a similar patch](https://groups.google.com/d/msg/vim_dev/QF7Bzh1YABU/02-YGr7_sCwJ). It was likewise rejected. But unlike me, Thiago didn't give up. He started [NeoVim](http://neovim.org/) and [created a Bountysource for it](https://www.bountysource.com/teams/neovim).

Neovim is exactly what it claims to be. It fixes every issue I have with Vim: The plugin API. The codebase. The community. The BDFL.

Neovim's plugin API is backwards-compatible with Vim, but it also allows asynchronous execution. Users have already made plugins that Vim can never have. For example, [Neomake](https://github.com/benekastah/neomake) allows async linters. That feature alone is worth making the switch for.

Neovim's codebase is a substantial improvement. They've [replaced much of the hacky, platform-specific code with libuv](https://github.com/neovim/neovim/wiki/Porting-OS-layer-to-libuv). They've fixed the problems with indentation, style, and bad file encodings. They've removed old code for ancient, unused platforms. They've drastically increased test quality and coverage. There's still much to be done, but the difference is already worlds better.

Neovim's development community is excellent. They respond to issues. They merge pull requests. They give quality feedback. And most importantly, they're nice to newbies.

In fact, they're nice to everyone. The main dev team holds no enmity toward Bram Moolenaar. They recognize Vim's failings, but they don't feel the need to criticize it.

The only thing Neovim is missing is a tagged stable release. But there's no need to wait. Right now you can clone Neovim, compile it, and have an editor that works with all your existing plugins.

If you are a Vim user, I strongly recommend switching to Neovim. It's the Vim you're used to, but with plugins you never knew you wanted.

---

Thanks to both [Bjorn Tipling](http://bjorn.tipling.com/) and [Matt Kaniaris](https://github.com/kans) for their help with this post.

1. <span id="ref_1"></span>[Edit](https://en.wikipedia.org/wiki/MS-DOS_Editor) and [pico](http://en.wikipedia.org/wiki/Pico_%28text_editor%29) don't count.
