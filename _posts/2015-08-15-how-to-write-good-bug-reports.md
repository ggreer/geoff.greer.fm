---
date: '2015-08-15 14:41:02'
layout: post
slug: how-to-write-good-bug-reports
published: true
title: How to Write Good Bug Reports
categories:
  - Computers
---

I've created and maintained several open source projects over the years, and my biggest annoyance is bug reports. Not bugs themselves. Those are inevitable, and the actual process of fixing them is interesting. But bug reports are another matter. Far too often, I get reports that are all but useless. They waste time and cause frustration for everyone involved. In the hope that I can reduce this, I offer some guidelines for writing good bug reports.

The goal of a bug report is to make it possible for a developer to reproduce the issue. I cannot emphasize this enough. A developer that can reproduce a bug is halfway to fixing it. At that point, they can bring their toolset to bear: debuggers, profilers, test cases, and lowly (but useful) `printf()`s. Inversely, trying to fix an unreproducible bug is an exercise in futility. Often, one ends up flying blind, reduced to hunches and guessing. Believe me, it is not fun.

So how do you make it easier for devs to reproduce a bug? Developers know the software in question, but your computing environment is a complete mystery to them. The more they know about it, the easier it will be for them to reproduce the issue. With this in mind, reports should contain information such as:

- The exact operating system version. (e.g. OS X 10.10.5)
- The version of the software that has the bug. (e.g. Chrome 44.0.2403.130, Sublime Text 3 Build 3083, ag version 0.30.0, etc.) It's not uncommon for users to report bugs that have been fixed in newer versions.
- Steps to cause the problem. Exact commands are very helpful.
- *Exact* error messages. Codebases can be searched for exact error messages. Not so for paraphrased ones.
- Debug logs. Again, copied exactly.
- Any unique data involved. I can't convey how infuriating it is for someone to say, "It breaks on this file." and *not* provide the file.

It's quite rare that I read a bug report and think, "Wow. This is way more info than I need." Also, it helps to reduce back-and-forth by overcommunicating. Every reply/response cycle reduces the likelihood that a dev will get to the bottom of the issue.

Guidelines are good, but I find examples help more. I don't want to single anyone out, but here are some examples of bad bug reports:

- [After installing, don;t have tools on path · Issue #3 · ggreer/dsniff](https://github.com/ggreer/dsniff/issues/3)
- [#BUG in diacritic · Issue #1 · ggreer/jekyll-gallery-generator](https://github.com/ggreer/jekyll-gallery-generator/issues/1)

If you see your name on one of those issues, don't feel upset. Reporting bugs is a skill. It doesn't come naturally. Just try to do better in the future.

On the flip side, here are some good bug reports:

- [Doesnt work with build from outside the source directory · Issue #18 · ggreer/jekyll-gallery-generator](https://github.com/ggreer/jekyll-gallery-generator/issues/18)
- [Ag thinks this PDF is not a binary file · Issue #637 · ggreer/the_silver_searcher](https://github.com/ggreer/the_silver_searcher/issues/637)
- [Cannot run ag in parallel · Issue #33 · ggreer/the_silver_searcher](https://github.com/ggreer/the_silver_searcher/issues/33)

Writing good bug reports requires more effort, but the payoff makes it worthwhile. Remember this when clicking, "Create Issue" and not only will you make developers' lives easier, but you'll improve the likelihood of getting the bug fixed.
