---
date: '2012-01-20 08:14:57'
layout: post
slug: building-for-others
status: publish
title: Building for Others
wordpress_id: '1065'
categories:
- Computers
---

I like to write new code. Unfortunately, writing new code is only a small part of building something useful. The [Pareto principle](http://en.wikipedia.org/wiki/Pareto_principle) applies. Once you've written 80% of the code in a short, fun-filled period, you spend much longer finishing up little things. You have to debug some odd edge case, clean up messy stuff that mostly works, and get it to build and run on some [obscure Linux distribution](http://www.ubuntu.com/).

Worst of all, you have to write documentation.

This stuff isn't fun, but it's necessary if you want others to use your project.

Because you made it, the various dependencies and [quirks are obvious to you](http://lesswrong.com/lw/ke/illusion_of_transparency_why_no_one_understands/). For the poor soul who clones your repository, the same is not true. Even compiling is a challenge for a newbie. What build system does your project use? Make? Scons? Ant? What build dependencies does it have? Does it check for them or print out a useful error message if any are missing? Is there a helpful README?

If you want other people to use (and possibly one day improve) your work, you need to polish the build scripts and write documentation. Think of it like a [sales funnel](http://en.wikipedia.org/wiki/Sales_process). Perhaps 100 people download your code, 80 get it to build, 75 run it, 50 use it regularly, 5 make modifications, and finally, 2 contribute patches back. You can increase the numbers. Making those steps easier will grow your user base and contributions. 

So that's what I've done with [Ag](/2011/12/27/the-silver-searcher-better-than-ack/). Over the past couple of weeks I've added a man page, [a wiki](https://github.com/ggreer/the_silver_searcher/wiki), accepted [pull requests](https://github.com/ggreer/the_silver_searcher/pull/9) to [clean up the build](https://github.com/ggreer/the_silver_searcher/pull/10), and even improved the --help output. 

I'll be the first to admit that fixing trivial inconveniences is boring. But frequently, boring work is the difference between a personal project and a community of users. Too often, [trivial inconveniences](http://lesswrong.com/lw/f1/beware_trivial_inconveniences/) stop projects from reaching critical mass. So if you want to build something for others, grit those teeth and go [schlep](http://paulgraham.com/schlep.html).
