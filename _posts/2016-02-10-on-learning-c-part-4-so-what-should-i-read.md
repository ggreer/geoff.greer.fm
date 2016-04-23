---
date: '2016-02-10 22:30:00'
layout: post
slug: on-learning-c-part-4-so-what-should-i-read
published: true
title: 'On Learning C, Part 4: What Should I Read? Why Should I believe you?'
categories:
- Computers
- Learning C
excerpt: C is special to me, as it was my first real programming language.
---

{% include on_learning_c.md number=4 %}

## Why should I believe you?

When it comes to C, I am quite proficient. I've been employed professionally to write C. I created [a somewhat popular open source project in C](/ag/). I have extensive experience profiling C programs[^1][^2], optimizing them[^3][^4], and making them multithreaded[^5]. I've contributed to other open source C projects. In short, if I'm not worth taking seriously on this topic, then very few people are.


### How I Learned C

C was my first real programming language.[^6] I was introduced to it at the age of 13. Thanks to some luck and an advanced placement test, I was allowed to take up to two classes per semester at [Gonzaga University](https://en.wikipedia.org/wiki/Gonzaga_University). Wanting to learn more about programming, I enrolled in CS121.

<br />

<img alt="My student ID" src="/images/student_id.jpg" style="width: 512px; height: 330px;" />

I stuck out a little on campus.

<br />

I distinctly remember an early assignment where I was completely stumped by a bug. I'd almost finished the program, but there was one issue that I couldn't fix. An `if` statement was always evaluating to `TRUE`, even when it shouldn't. The `else` was never taken. The program compiled without warnings. It was incredibly frustrating.

I spent *two days* staring at that code. I didn't know about debuggers, so I peppered my code with `printf()`s. I commented and uncommented chunks of code. No matter what I tried, I simply couldn't understand why the program was misbehaving. I was almost in tears when I asked my dad for help. He saw the problem in seconds:

{% highlight c %}
if (a = b) {
  ...
} else {
  ...
}
{% endhighlight %}

I had a single equals in a conditional. That meant I was assigning `a` to `b` instead of comparing them. As soon as I added another equals, my program worked flawlessly. All that effort and frustration was caused by a single missing character.[^7]

I'm still surprised that, afterwards, I remained interested in writing code. I've quoted him before, but [Douglas Crockford](http://www.crockford.com/) [said it best](http://www.youtube.com/watch?v=taaEzHI9xyY#t=26m50s):

>I think there has to be something seriously wrong with you in order to do this work. A normal person, once they've looked into the abyss, will say, "I'm done. This is stupid. I'm going to do something else." But not us, 'cause there's something really wrong with us.

This was undoubtedly the most difficult educational experience of my life. I really did learn C the hard way.


## So what should I read?

Honestly? I'm not sure. For those who want to to learn C, I have yet to find a book that I can unconditionally recommend. The only text I can personally suggest is [the Kernighan and Ritchie book](https://en.wikipedia.org/wiki/The_C_Programming_Language) from [part 1]({% post_url 2016-01-04-on-learning-c-part-1-k-r %}). As I said in that post, caveats apply.

For those who know some C and are looking to improve their skills, there are better resources. I've heard good things about [Robert Love](https://www.rlove.org/)'s [*Linux Kernel Development*](http://www.amazon.com/Linux-Kernel-Development-3rd-Edition/dp/0672329468) ([PDF](http://moodle2.insa-lyon.fr/pluginfile.php/16715/course/section/4469/Linux%20Kernel%20Development%203rd%20Edition%20-%20Love%20-%202010.pdf)). And though it covers *much* more than C, [*Computer Systems: A Programmer's Perspective*](http://www.amazon.com/Computer-Systems-Programmers-Perspective-Edition/dp/0136108040) will teach you all the gory details of how source code gets turned into machine code.

<!-- There are also a few resources I haven't reviewed, bu
[Modern C](http://icube-icps.unistra.fr/index.php/File:ModernC.pdf) by [Jens Gustedt](http://icube-icps.unistra.fr/index.php/Jens_Gustedt)

C Programming: A Modern Approach

http://www.amazon.com/Programming-Modern-Approach-2nd-Edition/dp/0393979504/
 -->

The dearth of good C books is a bit of a bummer, but there may be a silver lining. I think many learners rely too much on books. It's often more educational to poke around on your own. Read other people's code. Examine open source projects. Ask others for help. And if you're not sure how something works, [do science]({% post_url 2012-01-30-programming-we-can-do-science %})!

---

[^1]: [Making Ag Faster: Profiling with Valgrind]({% post_url 2012-01-23-making-programs-faster-profiling %})

[^2]: [Profiling with Gprof]({% post_url 2012-02-08-profiling-with-gprof %})

[^3]: [Optimizing Ag: Special-casing File Extensions]({% post_url 2015-02-08-optimizing-ag-special-casing-file-extensions %})

[^4]: [Profiling Ag. Writing My Own Scandir]({% post_url 2012-09-03-profiling-ag-writing-my-own-scandir %})

[^5]: [The Silver Searcher: Adding Pthreads]({% post_url 2012-09-07-the-silver-searcher-adding-pthreads %})

[^6]: Before that, I'd only written a few toy programs in [Logo](https://en.wikipedia.org/wiki/Logo_%28programming_language%29), [QBasic](https://en.wikipedia.org/wiki/QBasic), and [TI-BASIC](https://en.wikipedia.org/wiki/TI-BASIC).

[^7]: If you're wondering why the compiler didn't warn about this, it's because this happened in 1998. Back then, gcc didn't warn about assignments in conditionals. Nowadays, any sane compiler will complain. How fortunate one is to learn C today. 🙂
