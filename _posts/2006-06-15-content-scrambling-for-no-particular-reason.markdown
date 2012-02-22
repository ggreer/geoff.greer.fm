---
date: '2006-06-15 01:03:58'
layout: post
slug: content-scrambling-for-no-particular-reason
status: publish
title: Content scrambling for... no particular reason.
wordpress_id: '18'
categories:
- Computers
---

So I noticed the site Wikipedia Watch keeps public chat-logs of #wikipedia on Freenode, and I couldn't help myself. I wrote a short perl script that scrambles my xchat logs so that it's impossible to tell who said what or even when any person was in the channel or not. The time-stamps are still consistent, but everything else is changed. Usernames and content are pseudo-randomly mixed up. Even join/part messages are in the wrong places, making for a completely useless log (at least for the person reading it). Still, a cursory glance of the logs doesn't raise any red flags. It almost looks like there are 5-10 conversations going on at once and it's hard to figure out what's going on. So I scrambled a copy of my logs since January and sent them over to Wikipedia Watch, since they don't have anything from before April. The guy I emailed didn't take the bait. He found out by monitoring #wikipedia, where I mentioned my plan. He also threw me on his [hate list](http://www.wikipedia-watch.org/hivemind.html#058), which is basically as much information he can find by googling someone's screenname along with some made-up stuff. He even took the copyrighted image from my user page on Wikipedia. 


My script probably has quite a few bugs in it, since I only coded it for my own Xchat logs. I haven't commented the code (or even properly indented it), so don't email me if you have questions. By next week I'll probably stumble on this thing and wonder, "What idiot wrote this?" before realizing it's my own code. Anyway, download it [here](/code/swap.txt). 
