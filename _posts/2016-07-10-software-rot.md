---
date: '2016-07-10 17:59:53'
layout: post
slug: software-rot
published: true
title: Software Rot
categories:
- Computers
---

In Age of Em, Robin Hanson briefly discusses software rot as a specific instance of a more general principle:

> 

I think he's right. Adapting mature software to new circumstances tends to take longer than writing new software from scratch. Open source software has several high-profile examples.


### Multi-process Firefox

When it was first written, Firefox had a single process model. After the release of Google Chrome, it was clear than a multi-process model allowed for better security and performance. Mozilla developers quickly began to sketch-out a path to making Firefox multi-process.

That was in 2007. Almost a decade later, Firefox *still* isn't multi-process.

compatible with existing extensions (or force devs to update their extensions)



### Event-driven httpd

Connection per process (fork)
Connection per thread ()
Event-driven (can support many more connections, immune to slowloris-style attacks)

Nginx 

httpd (multi-process, multi-thread) vs nginx (event-driven)




### Conclusion

These are just a few 

- Python GIL
- 



linux kernel arch?

other candidates for software rot:
android audio stack?

http://www.overcomingbias.com/2016/06/why-does-software-rot.html

https://twitter.com/robinhanson/status/616982698305974272


https://en.wikipedia.org/wiki/Software_rot

http://www.agile-process.org/change.html
