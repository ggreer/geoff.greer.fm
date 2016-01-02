---
date: '2016-01-04 21:38:43'
layout: post
slug: on-learning-c-and-zed-shaw
published: true
title: On Learning C and Zed Shaw
categories:
- Computers
---

C is an important language for many reasons. It's ubiquitous. There is likely no other language that can run on so many platforms. It's *fast*. It gets you closer to the bare metal than anything but assembly. It has a long history, much of it tied up with the beginnings of UNIX.

It also has a reputation for being hard to master. When novices ask, "What book should I read to learn C?", 

Zed Shaw wrote *Learn C the Hard Way*

Unlike those who read the titular book, I actually *did* learn C the hard way. I was twelve years old, and it was my first real programming language.[1] Thanks to some luck and advanced test placement, I'd gotten 

I distinctly remember being stumped by a bug in an early programming assignment. There was an `else` statement that never seemed to be taken.

It compiled without warnings.

I spent days staring at that code. I added `printf()`s. I ... No matter what I tried, I simply couldn't understand why the program was misbehaving.

I was practically in tears when I asked my dad for help. He saw the problem in seconds:

{% highlight c %}
if (a = b) {
  ...
} else {
  ...
}
{% endhighlight %}

That's right, a single equals in a conditional. All that effort and frustration for a single character.

I've quoted him before, but [Douglas Crockford](http://www.crockford.com/) [said it best](http://www.youtube.com/watch?v=taaEzHI9xyY#t=26m50s):

>I think there has to be something seriously wrong with you in order to do this work. A normal person, once they've looked into the abyss, will say, "I'm done. This is stupid. I'm going to do something else." But not us, 'cause there's something really wrong with us.


http://hentenaar.com/dont-learn-c-the-wrong-way
https://news.ycombinator.com/item?id=9636605

https://www.reddit.com/r/C_Programming/comments/3rd4dg/peer_review_learn_c_the_hard_way_by_zed_shaw_pub/

https://github.com/btrask/stronglink/blob/master/SUBSTANCE.md


---

1. I'd dabbled in [QBasic](https://en.wikipedia.org/wiki/QBasic) and [TI-BASIC](https://en.wikipedia.org/wiki/TI-BASIC), but it was mostly tweaking other people's code, not writing anything substantial.
