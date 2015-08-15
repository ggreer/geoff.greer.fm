---
date: '2015-08-15 14:41:02'
layout: post
slug: how-to-write-good-bug-reports
published: true
title: How to Write Good Bug Reports
categories:
  - Computers
---

I've created and maintained several open source projects over the years, and my biggest annoyance is bug reports. Not bugs themselves. Those are inevitable, and the process of fixing them is interesting. But bug reports are another matter. All too often, I get reports that are all but useless. They waste time and cause frustration for everyone involved.

If there is one thing a bug report should do, it is make it possible for developers to reproduces the issue. I cannot emphasize this enough. 

That means including several crucial pieces of information, such as:

- Your operating system, including the exact version. (e.g. OS X 10.10.5)
- Your CPU architecture. (x86, x86-64, ARM, etc.)
- The version of the software that has the bug. (e.g. Chrome 44.0.2403.130, Sublime Text 3 Build 3083, ag version 0.30.0, etc.) It's not uncommon for users to report bugs that have been fixed in newer versions.
- Steps to cause the problem.
- Exact error messages. Surrounding info is also useful.
- Running with debug logging on. Again, copy-paste the exact messages. Do not paraphrase!

It's best to err on the side of overcommunicating. Developers may be experts when it comes to the software in question, but they have no idea what your computing environment is like.

Guidelines are good, but I find examples even better. I don't want to single anyone out, but here are some examples of bad bug reports:

- [After installing, don;t have tools on path · Issue #3 · ggreer/dsniff](https://github.com/ggreer/dsniff/issues/3)
- [#BUG in diacritic · Issue #1 · ggreer/jekyll-gallery-generator](https://github.com/ggreer/jekyll-gallery-generator/issues/1)

If you see your name on one of those issues, don't feel upset. Reporting bugs is a skill. It doesn't come naturally.

On the flip side, here are some good bug reports:

- [Ag thinks this PDF is not a binary file · Issue #637 · ggreer/the_silver_searcher](https://github.com/ggreer/the_silver_searcher/issues/637)
- [Cannot run ag in parallel · Issue #33 · ggreer/the_silver_searcher](https://github.com/ggreer/the_silver_searcher/issues/33)
- [Doesnt work with build from outside the source directory · Issue #18 · ggreer/jekyll-gallery-generator](https://github.com/ggreer/jekyll-gallery-generator/issues/18)

