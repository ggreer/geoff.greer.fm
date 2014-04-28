---
date: '2014-04-28 17:57:56'
layout: post
slug: making-windows-a-unix
published: true
title: Making Windows a Unix
categories:
  - Computers
---

I think Microsoft could turn Windows into a really good Unix. It wouldn't be a piece of cake, but it's probably not as crazy as it sounds. Let me explain.

Microsoft could do the following:

1. Keep the Windows kernel, system services, libraries, and GUI. No big changes there.
1. Add bash/zsh and the BSD userland to PowerShell.
1. Make a `cc` front-end to Visual Studio's compiler.<sup>[\[1\]](#ref_1)</sup>
1. Bundle a libc to provide support for [pthreads](http://en.wikipedia.org/wiki/POSIX_Threads), `mmap()` and other POSIX system calls. It's probably worthwhile to imitate Android and fork the BSD libc.

The result would be similar to [Cygwin](http://www.cygwin.com/) or [MinGW](http://www.mingw.org/), but bundled in the default install of Windows and (most importantly) fully supported by Microsoft. The crazy thing is, Microsoft actually got pretty close to building this with [Windows Services for UNIX](http://en.wikipedia.org/wiki/Windows_Services_for_UNIX). Unfortunately they didn't publicize it much<sup>[\[2\]](#ref_2)</sup>, didn't ship it as a default, and now they're discontinuing it.

That's a shame, because a Unix-compatible Windows would be a very flexible, powerful operating system. With it, you'd be able to compile and run almost all C programs written for BSD or Linux, *and* you could run Windows programs just like normal. You could use the same OS to develop your Django app and test on IE, without any battery-sucking VMs. And your laptop would work great. There'd be no messing with X or Unity. No faulty Linux drivers causing issues with suspend/hibernate, trackpad weirdness, backlight brightness, wifi, or sound. The experience would be similar to developing on a mac, but with a larger selection of hardware and software.

I doubt Microsoft will do this, but they could attract a lot of non-Windows developers if they did.

---

1. <span id="ref_1"></span>And update it to at least C99. Current versions of Visual Studio only support C89.
1. <span id="ref_2"></span>I didn't even know about SFU/SUA until I spent an hour researching this topic.
