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

What sort of software can be written today that would still be in service a century from now? This assumes no technological singularity or Mayan apocalypse; just people, software, and computers. Also, it doesn't have to be the *exact* same code. Maintaining the codebase is allowed. <span class="thought_countdown_hide">Before reading on, give it <span id="thought_countdown">60 seconds</span> of thought.</span>

<span class="thought_countdown_hide">Don't worry. I'll wait.</span>

<br />

<br />

<br />

<br />

...

<br />

<br />

<br />

<br />

My first ([though not unique](https://twitter.com/bjorntipling/status/513560354425556992)) idea was software for space probes. Interstellar probes last a long time. [The Voyagers](https://en.wikipedia.org/wiki/Voyager_program) have been running for over 40 years, and can be expected to remain active for another decade. That only gets us halfway to our goal, but there are older software projects still in use today. Most of them can be built more easily than space probes.

[Grep](https://en.wikipedia.org/wiki/Grep) was created by [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson) in 1973. FreeBSD and OS X use a descendant of the original code. Every Mac has software with roots going back over 40 years. (Sorry Linux users, GNU grep was created in 1999.)

Considering all that has changed, how has grep survived for so long? The original grep was compiled for the [PDP-11](https://en.wikipedia.org/wiki/PDP-11). The file encodings it supported are long dead. Computers have gotten a million times faster since it was created.

I think there are several factors explaining grep's longevity:

1. The code is permissively licensed.
1. It was written in a language that remains popular \(C\).
1. The problem it solves (searching text files & streams) is still a problem today.
1. People maintain it, mostly because of the reasons above.

Anything we build today should satisfy similar criteria.

Just as a binary compiled on a PDP-11 in 1973 won't run on a modern computer, I doubt that anything compiled today will run on a computer a century hence. Even if the source code is available, it will require maintenance. There are simply too many unpredictable ways in which computers will change. New CPU architectures and operating systems will arise. New protocols and encoding formats will be standardized. New interaction paradigms will be invented. Hardware will probably get a million times faster.

So what, if anything, *won't change*? Which of today's programming languages will still be supported? Which file formats used today will still be popular in 2114?

When it comes to language support in 2114, few of today's languages will survive. If I had to put my money on one, it would be C. Fortran and COBOL might still be used, but they're niche languages even today. Newer languages such as Python, Ruby, and JavaScript may still be around, but they evolve more quickly than C. Any software written in those languages will require more effort to maintain. Go and Java aren't terrible bets, but C has been around for longer and is simpler to implement.

File formats come and go, but one has been around since the beginning: Text files, and they're as popular as ever. The encoding format may change, but it will likely be a superset of ASCII (like UTF-8).

It's not crazy to believe that if humans are still alive and using computers in 2114, they'll have text files and C compilers. It was only after I'd come to this conclusion that I realized [Ag](/ag/) fits the criteria.

I hope that one day, a software archeologist reads my code and thinks, "Jeez, people back then must have had a lot of lead in their brains."


<script type="text/javascript">
function start_countdown() {
  var i = 60,
    tc_elem = document.getElementById("thought_countdown"),
    tc,
    tch = document.getElementsByClassName("thought_countdown_hide"),
    tci;

  tc = function () {
    i--;
    if (i > 0) {
      tc_elem.innerHTML = i + " second" + (i === 1 ? "" : "s");
    } else {
      clearInterval(tci);
      Array.prototype.forEach.call(tch, function (n) {
        n.style.transitionDuration = "1s";
        n.style.opacity = 0;
      });
    }
  }

  tci = setInterval(tc, 1000);
}
setTimeout(start_countdown, 4000);

</script>
