---
date: '2012-03-22 21:01:17'
layout: post
slug: work-patterns-on-a-plane
status: draft
title: Work Patterns on a Plane
categories:
- Computers
- Productivity
---

I've found that planes provide a good opportunity for me to get stuff done. The isolation[\[1\]](#ref_1) helps me avoid distractions and forces my mind to stay focused on the job at hand. I'm also buoyed by the knowledge that I will have minimal interruptions for the duration of the flight.

But there are some caveats.

Having a small laptop is crucial. Large laptops won't fit on your lap if someone reclines their seat. 

I can't get just do any sort of work on a plane. Anything requiring Internet access is right-out. Learning a new programming language isn't going to happen. There are just too many tools I'd have to download and newbie error messages that I'd have to google. Writing something new in Twisted Python is fine, since I know the language and I can save all the necessary documentation beforehand. Writing C is also fine, since most of its documentation is in manpages. And anything I can't figure out from docs I can usually figure out with [science](/2012/01/30/programming-we-can-do-science/).

Another issue: If I travel with any sort of [shallow content](/2011/12/04/consume-less-shallow-content), I end up wasting time (and battery life) watching movies instead of coding.

Speaking of battery life: it's a bit of a problem. My 11" Air lasts 2-7 hours depending on what I'm doing[\[2\]](#ref_2). That's good enough for most domestic flights, but the poor thing didn't stand a chance on my recent [Japan trip](/2012/03/19/japan-trip). If my Air dies, I switch to my backup netbook. It's not as functional, but the spare battery can give it over 12 hours of run-time.

I got a ton of work done on [The Silver Searcher](https://github.com/ggreer/the_silver_searcher) while flying. I managed to [add support for pipes](https://github.com/ggreer/the_silver_searcher/commit/050ead66ee98abbfba639fd5ff7eded53c630455), [refactor the searching code](https://github.com/ggreer/the_silver_searcher/pull/16/files), [clean up some particularly ugly code](https://github.com/ggreer/the_silver_searcher/commit/b4dd2ac496edb75fec7bc4f66dde2fedead23b6f), and fix some bugs related to [printing](https://github.com/ggreer/the_silver_searcher/commit/46cc97f1ebe843e93825fbf8245d2dd2592a3a73) [matches](https://github.com/ggreer/the_silver_searcher/commit/a2bbca668dac9dcfbf55dad2887d2d2569bae2f7). In total I changed over 1,000 lines on the trans-pacific flights. I accomplished more in those 20 hours than I did in the month previous. I also felt an unusually large sense of accomplishment.

As [Russell](http://russellhaering.com/) [says](https://twitter.com/#!/russell_h/status/180862812074164224), "If you want to find time to hack on a side project, get on an airplane."

---
<a name="ref_1"> </a>
1. Lack of Internet access, phone, or friends nearby.
<a name="ref_2"> </a>
2. I realize this is a huge range. The CPU and screen seem to be the biggest power hogs. If I don't pay any attention to power consumption and just run the screen bright, the battery will last about 4 hours. Keeping brightness low and CPU usage to a minimum can almost double that.
