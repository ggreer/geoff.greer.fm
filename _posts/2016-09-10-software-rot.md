---
date: '2016-09-10 17:59:53'
layout: post
slug: software-rot
published: true
title: Software Rot
categories:
- Age of Em
- Computers
excerpt: 'Adapting mature software to new circumstances tends to take longer than writing new software from scratch. Open source software has several high-profile examples.'
---

In Age of Em, Robin Hanson briefly discusses software rot as a specific instance of a more general principle:

> insert quote here

I think he's right. Adapting mature software to new circumstances tends to take longer than writing new software from scratch. Open source software has several high-profile examples.


## Multi-process Firefox

When it was first written, Firefox ran everything in a single process. After the release of Google Chrome, it was clear than a multi-process model allowed for better security and performance. Mozilla developers quickly began to sketch-out a path to making Firefox multi-process. That was in 2007.

Almost a decade later, Firefox *still* isn't multi-process. This delay isn't from lack of trying. The teams at Mozilla are talented and driven. Still, Chrome was written from scratch in less time than it's taken for Firefox to change. There are several specific reasons for this.

compatible with existing extensions (or force devs to update their extensions)



## Event-driven Apache

When Apache httpd was first written, it used a process-per-connection model. One process would listen on port 80, then `accept()` and `fork()`. The child process would then `read()` and `write()`, finally closing and exiting when it was done. This architecture has the advantage of being simple, easy to implement across platforms, and… not much else. It's absolutely terrible for performance, especially when handling long-lived connections. To be fair, this *was* 1995.

Apache eventually moved to a threaded model, which did help performance. Still, it couldn't handle [10,000 simultaneous connections](c10k problem).

In contrast, [Nginx]() was engineered with an event loop architecture. This allowed it to service many more concurrent connections. The advantage was


(link to forking conn handler model)

Connection per process (fork)
Connection per thread ()
Event-driven (can support many more connections, immune to slowloris-style attacks)


httpd (multi-process, multi-thread) vs nginx (event-driven)



## CPython GIL

Python is slow.


## Conclusion

Even with talented engineers, plenty of money, and clear vision, changing mature software can be near-impossible. I tried to find cases that disproved software rot, but they don't seem to exist.




http://www.overcomingbias.com/2016/06/why-does-software-rot.html

https://twitter.com/robinhanson/status/616982698305974272


https://en.wikipedia.org/wiki/Software_rot

http://www.agile-process.org/change.html
