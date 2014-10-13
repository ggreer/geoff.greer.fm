---
date: '2014-10-06 19:39:37'
layout: post
slug: getting-to-ag-10
published: true
title: Getting to Ag 1.0 (and an invitation to pair with me)
categories:
  - Computers
  - the_silver_searcher
---

[My work](https://floobits.com/) has resulted in me neglecting [Ag](/ag/) over the past 18 months. There have been bug fixes, a few new features, and contributions by users. But one pernicious class of issuess remain: Ignore patterns aren't obeyed correctly.

This is by far the most-reported class of issues. There are a few reasons why they persist:

1. I don't use many types of ignore patterns in my own repos.
2. Correctly parsing patterns requires complicated code.
3. Many patterns are pathologically slow.
4. Complicated patterns often don't do what people expect. In many cases, it may make sense for Ag to ignore them and print a few extra results.

Recently, I paired with [Theo Spears](https://github.com/theospears) on some of the ignore pattern issues. Theo has a great personality and a sharp mind. Together, we were able to make good progress on ignores. Hopefully our schedules will allow us to collaborate in the future. Theo was also kind enough to triage many duplicate issues, which I have been slowly closing.

There's only one other issue I want to fix before tagging a 1.0 release: `--context` doesn't work when searching pipes. Once that's taken care of, I think most future additions will be tests and bug fixes.

If I had to bet on Ag 1.0's release date, I would say January. My real work consumes me. Any time I spend on Ag is time I don't spend working on Floobits. Progress on Ag happens when others want to pair with me, since that also gives me a chance to get feedback about Floobits.

To that end, I extend an invitation: **If you know C and want to pair with me on Ag, [let me know](/about/#contact).** It doesn't matter where you live. [Floobits](https://floobits.com/) makes it possible to pair from anywhere, so long as one has the bandwidth for video chat.
