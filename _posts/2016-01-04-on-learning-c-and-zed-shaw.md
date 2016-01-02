---
date: '2016-01-04 21:38:43'
layout: post
slug: on-learning-c-and-zed-shaw
published: true
title: On Learning C and Zed Shaw
categories:
- Computers
---

C is an important language for many reasons. It's ubiquitous. No other language runs on as many platforms. It's *fast*. It gets you closer to the bare metal than anything but assembly. It's old. It has a long history, much of it tied up with the beginnings of UNIX.

It also has a reputation for being hard to master.

When novices ask, "What book should I read to learn C?", I've heard two common recommendations:

* [Kernighan](https://en.wikipedia.org/wiki/Brian_Kernighan) & [Ritchie](https://en.wikipedia.org/wiki/Dennis_Ritchie)'s [*The C Programming Language*](https://en.wikipedia.org/wiki/The_C_Programming_Language), AKA "the K&R book."
* [Zed Shaw](https://en.wikipedia.org/wiki/Zed_Shaw)'s [*Learn C the Hard Way*](http://c.learncodethehardway.org/book/), AKA "LCTHW."

Unfortunately, I can't recommend either to beginners. Allow me to explain why.


## K&R: Decent, but Dated

The K&R book does an excellent job of explaining the C language. It describes syntax, keywords, program structure, preprocessor behavior, and the standard library. There's just one problem: it's old. The last major update was in 1988. This leads to some amusing anachronisms:

> One aspect of C functions may be unfamiliar to programmers who are used to some other languages, particularly Fortran. In C, all function arguments are passed "by value."<sup>[\[1\]](#ref_1)</sup>

 Omissions due to age include:

* `//`-style comments
* New types such as `bool` and `long long`
* Variable-length arrays
* [Inline functions](https://en.wikipedia.org/wiki/Inline_function)
* [Variadic macros](https://en.wikipedia.org/wiki/Variadic_macro)
* `snprintf()`

It's not essential for a beginner know about these features, but a book about C should at least mention them. K&R really needs an update.

The biggest reason I can't recommnend K&R to beginners is due to its lack of a "getting started" section.

K&R also avoids any mention of build systems, debuggers, or profiling tools.


## Learn C the Hard Way: A Flawed Text with an Agenda





Unlike those who read the titular book, I actually *did* learn C the hard way. I was twelve years old, and it was my first real programming language.<sup>[\[2\]](#ref_2)</sup> Thanks to some luck and an advanced placement test, I'd gotten into CS121 at Gonzaga University.

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

1. <span id="ref_1"></span>Section 1.8: Arguments – Call by value. For those who may not know: Today, pass by value is the most popular design in modern languages.
2. <span id="ref_2"></span>I'd dabbled in [QBasic](https://en.wikipedia.org/wiki/QBasic) and [TI-BASIC](https://en.wikipedia.org/wiki/TI-BASIC), but it was mostly tweaking other people's code, not writing anything substantial.
