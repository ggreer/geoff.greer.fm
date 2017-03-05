---
date: '2017-02-28 17:59:53'
layout: post
slug: software-rot
published: true
title: Software Rot
categories:
- Age of Em
- Computers
excerpt: "Software rots. That is: Adapting mature software to new circumstances tends to take more time and effort than writing new software from scratch. Software people don't like to admit this, but open source software has several high-profile examples."
---

In his book [*Age of Em: Work, Love and Life when Robots Rule the Earth*]({% post_url 2016-07-23-age-of-em %}), Robin Hanson briefly discusses software rot:

> As software that was designed to match one set of tasks, tools, and situations is slowly changed to deal with a steady stream of new tasks, tools, and situations, such software becomes more complex, fragile, and more difficult to usefully change (Lehman and Belady 1985)[^Lehman]. Eventually it is better to start over and write whole new subsystems, and sometimes whole new systems, from scratch.

I'm pretty sure this is true. Adapting mature software to new circumstances tends to take more time and effort than writing new software from scratch. Software people don't like to admit this, but the evidence is clear. Open source software has several high-profile examples.


## Multi-process Firefox

When it was first written, [Mozilla Firefox](https://en.wikipedia.org/wiki/Firefox) ran everything in a single process. After the release of [Google Chrome](https://en.wikipedia.org/wiki/Google_Chrome), it was clear that a multi-process model allowed for better security and performance. Mozilla developers quickly began to sketch-out a path to making Firefox multi-process. That was in 2007.

Almost a decade later, Firefox is just now becoming multi-process. This delay isn't from lack of trying. The teams at Mozilla are talented and driven. Still, Chrome was written from scratch in less time than it's taken for Firefox to change. There are several reasons for this:

- Making a single process architecture multi-process means changing a *lot* of small things. Certain function calls have to be replaced with inter-process communication. State can't be stored in shared variables. Caches and local databases must handle concurrent access.
- Firefox needed to be compatible with existing add-ons (or make devs update their add-ons). Chrome could create an extention API from scratch.


## Event-driven Apache

When Apache httpd was first written, it used a process-per-connection model. One process would listen on port 80, then `accept()` and `fork()`. The child process would then `read()` and `write()` on the socket. When the request was finished, the child would `close()` the socket and `exit()`.

This architecture has the advantage of being simple, easy to implement on many platforms, and… not much else. It's absolutely terrible for performance, especially when handling long-lived connections. To be fair, this *was* 1995. Apache soon moved to a threaded model, which did help performance. Still, it couldn't handle [10,000 simultaneous connections](https://en.wikipedia.org/wiki/C10k_problem). A connection-per-thread architecture means that it takes 1,000 threads to service 1,000 concurrent connections. Each thread has its own stack and state, and must be scheduled by the operating system. In short: a bad time.

In contrast, [Nginx](https://www.nginx.com) used a [reactor pattern](https://en.wikipedia.org/wiki/Reactor_pattern) from the start. This allowed it to handle more concurrent connections and rendered it immune to [slowloris attacks](https://en.wikipedia.org/wiki/Slowloris_%28computer_security%29).

Nginx was first released in 2007, and its performance advantage was obvious. Apache devs started work on re-architecting httpd to perform comparably. It took six years for Apache 2.4 to ship with the [event MPM](https://httpd.apache.org/docs/2.4/mod/event.html). While far better than the previous prefork and worker MPMs, this doesn't acheive parity with Nginx. Instead, it uses separate thread pools for listening/accepting connections and processing requests. It's roughly equivalent to running a load balancer or reverse proxy in front of Apache.


## CPython GIL

Python is a nice programming language. It's expressive, easy to learn (at least as programming languages go), and it's supported on a wide variety of platforms. But for the past two decades, the most popular implementation of Python has had one major problem: it's hard to parallelize. In other words, it can't easily take advantage of multiple CPU cores.

The biggest reason for Python's lack of parallelism is its global interpreter lock, or GIL. From [the Python wiki](https://wiki.python.org/moin/GlobalInterpreterLock):

> In CPython, the global interpreter lock, or GIL, is a mutex that prevents multiple native threads from executing Python bytecodes at once. This lock is necessary mainly because CPython's memory management is not thread-safe. (However, since the GIL exists, other features have grown to depend on the guarantees that it enforces.)

Originally, the GIL wasn't a big deal. When Python was invented, multi-core systems were rare. And a GIL is simple to write and easy to reason about. Today, even watches have multi-core CPUs.



## Conclusion

Even when given talented engineers, plenty of money, and clear vision, mature software can be near-impossible to change. I tried to find cases that disproved software rot, but they don't seem to exist. Robin Hanson [asked for counterexamples](https://twitter.com/robinhanson/status/616982698305974272) and nobody came up with anything convincing. There are plenty of old software projects, but they haven't had to adapt much. I'd love to be proven wrong on this, as it paints bleak picture for the long-term future of software.

---

### Read more

- [Overcoming Bias: Why Does Software Rot?](http://www.overcomingbias.com/2016/06/why-does-software-rot.html)
- [Suprise: Software rots!](http://www.agile-process.org/change.html)
- [Wikipedia: Software rot](https://en.wikipedia.org/wiki/Software_rot)

---

[^Lehman]: The cite is for a text called *Program Evolution: Processes of Software Change*. The work is older than me, and I can't find an online version. I bought a physical copy and have been slowly making my way through it. So far, the terminology is odd, but the conclusions haven't been particularly surprising.
