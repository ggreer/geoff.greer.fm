---
date: '2012-10-19 16:42:44'
layout: post
title: 'Cross-editor Real-time Collaboration'
published: true
categories:
- Computers
- Floobits
---

Two months ago I quit my job at Rackspace. After a few weeks of relaxing, I started working on my own business ideas.

I think I've finally settled on one.

I like to [pair program](http://en.wikipedia.org/wiki/Pair_programming), but that requires being in front of the same screen as someone else. Remote collaboration tools exist, but they're all web-based. If I want to edit the same code in real-time with others, I have to pick a web-based editor like EtherPad, Stypi, or Cloud9. None of these are as good as my highly-customized TextMate. Let me explain why.

Web-based editors have significant disadvantages. The biggest one is that users pay the cost of switching to a new editor. Developers spend years learning and customizing their editors. They hardly ever switch, because doing so means they lose all those customizations. Worse, the experience and knowledge of their old editor becomes useless. These high costs of switching are why developers usually end up choosing an [extensible, maintained, popular editor](http://www.gwern.net/Choosing%20Software) and sticking with it for their careers.

In addition to the deal-breaker above, web-based editors have a bunch of minor annoyances. They require a stable Internet connection. If they go down, you can't edit things. They usually have no plugin architecture. Even if they do, the ecosystem of plugins is tiny. It's hard to integrate them with local programs like linters or code-searching tools. Revision control integration is also a problem. How do you commit and push from a web-based editor, give them your private key?

Finally, there's the risk that the company making the editor goes out of business. If that happens, every user is SOL. They have to find something else and pay the cost of switching editors all over again. 

Despite all these disadvantages, web-based collaborative editors thrive. What gives? My hypothesis is that there is a much better solution to real-time collaboration. And I'm going to make it.

The plan is to build plugins for every popular editor. Then Alice can work in Vim while Bob works in Emacs and Carol edits in Sublime Text 2. Everybody's happy. Of course, there will be a web-based editor too.

Nobody has done this before, and I'm pretty sure I know why: It's *hard*. Not only do you have to solve all the problems of a real-time collaborative editor, you have to write plugins for every popular editor. Different editors use different scripting languages. Sublime Text uses Python, Emacs uses Elisp, Vim uses Vim script, and TextMate uses Objective-C. Each editor's plugin architecture has vastly different capabilities.

Today I asked around for name ideas and [Bjorn](http://bjorn.tipling.com/) came up with [Floobits](http://floobits.com/). It'll be a while until launch, so don't hold your breath.

So if you were wondering what I've been up to, that's what. I've also applied to [Y Combinator](http://ycombinator.com/).
