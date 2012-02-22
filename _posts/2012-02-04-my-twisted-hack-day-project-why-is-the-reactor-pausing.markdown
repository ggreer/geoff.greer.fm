---
date: '2012-02-04 23:04:44'
layout: post
slug: my-twisted-hack-day-project-why-is-the-reactor-pausing
status: publish
title: 'My Twisted Hack Day Project: Why is the Reactor Pausing?'
wordpress_id: '1316'
categories:
- Computers
---

Last week we had a [twisted](http://twistedmatrix.com/trac/) hack day at work. The project I work on has over a dozen twisted services, so this was right up my alley. I knew a couple of services were doing dumb things (like DB calls in the main thread) but nobody had gotten around to fixing the issues.\[1\] It's pretty easy to find most instances of Django calls in the main thread, but there are many other ways to hang the reactor. I wanted to find every instance of pausing, so that's what I decided to make for my hack day project.

Before the hack day, [Jean-Paul Calderone](http://as.ynchrono.us/) came to the office and gave some talks about twisted. I asked him if there were any tools for finding the cause of reactor pauses. He said he'd built his own little script a while back, and that the key was to use [SIGALRM](http://en.wikipedia.org/wiki/SIGALRM). That was enough to get me on the right track.

[Here's the result](https://github.com/ggreer/twisted_hang). It's a pretty simple script. Every 100 milliseconds, it cancels any pending SIGALRM and calls [setitimer](http://docs.python.org/library/signal.html#signal.setitimer), so that the OS will send SIGALRM to the process in 500ms. It also has a handler for SIGALRM that logs a traceback and adds the offending function to a stats dict.\[2\]

If the reactor is paused for more than 500ms, the pending SIGALRM won't be cancelled, so it will be sent to the process. Then the handler will print out the traceback and update stats. Pretty handy.

My tool can give false positives on a heavily-loaded system. This is because I'm calling setitimer with ITIMER_REAL instead of ITIMER_VIRTUAL. Using virtual time won't catch stuff like sleep()s in the main thread, since sleeping doesn't count toward execution time. Using real time will fire the SIGALRM after 0.5 seconds even if the process has gotten zero time on the CPU. I got a few false positives on my overloaded VM, but this turned out to be beneficial. The tracebacks went all the way to [select()](http://en.wikipedia.org/wiki/Select_(Unix)). I mentioned this fact to [Paul](http://journal.paul.querna.org/) and he reminded me that we should be using the [epoll reactor](http://twistedmatrix.com/documents/current/core/howto/choosing-reactor.html#auto9).

That's two production issues identified and fixed because of a silly hack day project. Booyah.\[3\]

  

  

  


Footnotes:

1. We got around performance issues by running multiple instances of these services. The problems were never fixed because they were in really old code that was written before anyone at Cloudkick knew how to write twisted.
2. A stats [defaultdict](http://docs.python.org/library/collections.html#collections.defaultdict), to be precise. If you haven't used defaultdict before, check it out. It will save you from writing some dumb boilerplate code.
3. I wasn't the only person to do a hack day project. [Here's the full list.](https://github.com/HackThePlanet/TwistedPython-HackDay)
