---
date: '2014-09-21 18:44:34'
layout: post
slug: the-long-now-of-software
published: true
title: The Long Now of Software
categories:
  - Computers
  - Futurism
---

What sort of software can be built today that would be useful a century from now?<sup>[\[1\]](#ref_1)</sup> Before reading on, give it <span id="thought_countdown">60 seconds</span> of thought.

Don't worry. I'll wait.

<br />

<br />

<br />

<br />

...

<br />

<br />

<br />

<br />

My first (and [not unique](https://twitter.com/bjorntipling/status/513560354425556992)) idea was software for space probes. Interstellar probes last a long time. [The Voyagers](https://en.wikipedia.org/wiki/Voyager_program) have been running for over 40 years, and can be expected to remain active for another decade. Still, there are older software projects in use.

BSD grep was written by [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson) in 1973. FreeBSD and OS X use its modern descendant. Hundreds of millions of Macs have software with roots going back over 40 years. (Sorry Linux users, GNU grep was created in 1999.)

How has grep survived for so long? The original grep binary was for the [PDP-11](https://en.wikipedia.org/wiki/PDP-11). The file encodings it originally supported are long dead. 

I think there are several reasons why grep has stuck around:

1. The code is licensed permissively.
1. The language it is written in (C) is still popular today.
1. The problem it solves (searching text files & streams) is still a problem today.
1. People maintain it, mostly due to the reasons above.



No matter what happens, I doubt that any executable compiled today will run on a computer a century hence. There are simply too many unpredictable ways in which computers will change. New CPU architectures and operating systems will arise. New protocols and encoding formats will be standardized. New interaction paradigms will be invented.

So what, if anything, *won't change*? Which of today's programming languages will still be supported? Which file formats used today today will still be popular in 2114?

Any software still used in 2114 must work with file formats so basic that even we would use them today. There is only one format that fits the bill: Text files. The encoding format may change, but it will likely be a superset of ASCII (like UTF-8).

Also, software must be written in a language that is still supported in 2114. In other words: C.<sup>[\[2\]](#ref_2)</sup> Newer languages 

It's not crazy to believe that, if humans are still around and using computers in 2114, they'll still have text files and C compilers. Will they also have JavaScript? Maybe, but I wouldn't rely on it to be fully backwards compatible. JavaScript has evolved much more quickly than C. 





<!-- draft stuff below -->

It's important to remember that software is like an [active structure](https://en.wikipedia.org/wiki/Active_structure). It must be maintaintained to remain compatible with its dependencies, or it will cease to work. The best way to ensure that maintainers are around is to make sure your software is useful.


1. <span id="ref_1"></span>This assumes no technological singularity or anything like that. Just people, software, and computers.

2. <span id="ref_2"></span>Fortran and COBOL might still be around, but they're niche languages even today.


<script type="text/javascript">
setTimeout(function () {
  var i = 60,
    tc = document.getElementById("thought_countdown"),
    tci;

  tci = setInterval(function () {
    i--;
    if (i >= 0) {
      tc.innerHTML = i + " second" + (i === 1 ? "" : "s");
    } else {
      clearInterval(tci);
    }
  }, 1000);
}, 10000);

</script>
