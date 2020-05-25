---
date: '2020-01-18 09:13:28'
layout: page
published: true
title: 'Plagiarism'
---

This page documents the times when someone has plagiarized my work. Fortunately these instances are exceedingly rare.

---

## Jekyll Gallery Generator

In January of 2020, [David Schmitt](https://club.black.co.at/log/) informed me that [Alex Ivkin](https://ivkin.net/) had copied code from my [Jekyll gallery generator](https://github.com/ggreer/jekyll-gallery-generator) and removed the LICENSE and NOTICE files in violation of the Apache 2.0 license.

I sent Alex a message:

> From: Geoff Greer  
> To: Alex Ivkin
>
> I noticed that your Jekyll art gallery plugin ([https://github.com/alexivkin/Jekyll-Art-Gallery-Plugin/blob/master/jekyll-art-gallery-generator.rb](https://github.com/alexivkin/Jekyll-Art-Gallery-Plugin/blob/881d6f90c13893f6cd5f00b1c9174d05e6ac3643/jekyll-art-gallery-generator.rb)) is *very* similar to my Jekyll gallery generator ([https://github.com/ggreer/jekyll-gallery-generator/blob/master/lib/jekyll-gallery-generator.rb](https://github.com/ggreer/jekyll-gallery-generator/blob/master/lib/jekyll-gallery-generator.rb)). In fact, it looks like your code is a modified version of my code. That's fine, except that the original software license and copyright notice are missing.
>
> I licensed my code under the Apache 2.0 license. This license states that you must keep attribution of the original author (me) and you must preserve the NOTICE file. You can relicense derivative code with many other licenses (such as MIT), but any modified files must have a notification at the top mentioning that they are modified from the original. See [https://snyk.io/blog/mit-apache-bsd-fairest-of-them-all/#apache-20-license-explained](https://snyk.io/blog/mit-apache-bsd-fairest-of-them-all/#apache-20-license-explained) for a short explanation of what the Apache 2.0 license entails.
>
> I'm glad my code has been found useful elsewhere, but I would like credit for my work. Please fix the licensing issue.
>
> Sincerely,
>
> Geoff Greer

Alex didn't reply, but he did [fix the attribution issue](https://github.com/alexivkin/Jekyll-Art-Gallery-Plugin/commit/454f3bf4815aee8cdb460c7dfa78dd77419535b3). I don't think he's following the letter of the Apache 2.0 license, but these are Jekyll plugins that hardly anyone uses, so there's no point in pressing the matter.
