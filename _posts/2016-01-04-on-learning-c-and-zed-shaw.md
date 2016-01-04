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

### Table of Contents
- [K&R: Decent, but Dated](#kr)
- [Learn C the Hard Way](#lcthw)
- [Why should I believe you?](#why)

---
<span id="kr"></span>

## K&R: Decent, but Dated

The K&R book does an excellent job of explaining the C language. It describes syntax, keywords, program structure, preprocessor behavior, and the standard library. There's just one problem: it's old. The last major update was in 1988. This leads to amusing anachronisms, such as the intro to a section about function arguments:

> One aspect of C functions may be unfamiliar to programmers who are used to some other languages, particularly Fortran. In C, all function arguments are passed "by value."<sup>[\[1\]](#ref_1)</sup>

Humor aside, the book's age does hurt its educational value. Omissions include:

- `//`-style comments
- [Inline functions](https://en.wikipedia.org/wiki/Inline_function)
- `snprintf()`
- Types such as `bool` and `long long`
- Variable-length arrays
- [Variadic macros](https://en.wikipedia.org/wiki/Variadic_macro)

It's not essential for beginners to know these features, but a book about C should at least mention them. K&R also avoids any mention of build systems (autotools), debuggers (gdb, lldb), or profiling tools (gprof, dtrace). That's more understandable though. These tools either didn't exist or were in their infancy when the book was authored. Considering how dated those sections would now be, it's probably a good thing that they don't exist.

Having read the book, I'm pretty sure Kernighan & Ritchie never had the goal of covering anything outside the language itself. And that's the main reason why I can't recommnend K&R to beginners. It lacks any sort of "getting started" section. It has no guides for setting up a basic development environment. No information on how to install and use a compiler. Again, I realize these sections would be completely out-of-date had they existed in the 1988 book. Still, it's important that books about languages help users set up development environments.

I think with a few updates and a companion book, K&R could be a solid intro to C. In its current form, it serves as more of an overview and reference.

---
<span id="lcthw"></span>

## Learn C the Hard Way: A Flawed Text with an Agenda

As harsh as that title may sound, I'm really not trying to court controversy. I have no grudge with Zed Shaw. In fact, I think he's a talented programmer and an excellent teacher. He has helped hundreds of thousands of people with his guide, [*Learn Python the Hard way*](http://learnpythonthehardway.org/). He has done far more to advance programming education than I could ever hope to.

But I'm sorry to say that *Learn C the Hard Way* is not worth reading.

I'm not alone in this view. The most well-known (though in my opinion, very flawed) criticism of LCTHW is [Learn C the Wrong way](http://hentenaar.com/dont-learn-c-the-wrong-way) by Tim Hentenaar. While snarky and hostile, it does contain valid criticisms.

I knew nothing about LCTHW or this spat until [someone asked for "peer reviews"](https://www.reddit.com/r/C_Programming/comments/3rd4dg/peer_review_learn_c_the_hard_way_by_zed_shaw_pub/) in [/r/C_Programming](https://www.reddit.com/r/C_Programming).


...

---
<span id="why"></span>

## Why should I believe you?

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



https://github.com/btrask/stronglink/blob/master/SUBSTANCE.md


---

1. <span id="ref_1"></span>Section 1.8: Arguments – Call by value. For those who may not know: Today, pass by value is the most popular design in modern languages.
2. <span id="ref_2"></span>I'd dabbled in [QBasic](https://en.wikipedia.org/wiki/QBasic) and [TI-BASIC](https://en.wikipedia.org/wiki/TI-BASIC), but it was mostly tweaking other people's code, not writing anything substantial.
