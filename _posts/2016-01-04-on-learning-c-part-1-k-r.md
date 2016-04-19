---
date: '2016-01-04 21:38:43'
layout: post
slug: on-learning-c-part-1-k-r
published: true
title: 'On Learning C, Part 1: K&R'
categories:
- Computers
- Learning C
---

{% include on_learning_c.md number=1 %}

C is an important language for many reasons. It's ubiquitous. No other language runs on as many platforms. It's *fast*. It gets you closer to the bare metal than anything but assembly. It's old. It has a long history, much of it intertwined with the beginnings of UNIX.

It also has a reputation for being hard to master.

When novices ask, "What book should I read to learn C?", I've heard a common recommendation: [Kernighan](https://en.wikipedia.org/wiki/Brian_Kernighan) & [Ritchie](https://en.wikipedia.org/wiki/Dennis_Ritchie)'s [*The C Programming Language*](https://en.wikipedia.org/wiki/The_C_Programming_Language), AKA "the K&R book." Unfortunately, I can't recommend it to beginners. Allow me to explain why.


## K&R: Decent, but Dated

The K&R book does an excellent job of explaining the C language. It describes syntax, keywords, program structure, preprocessor behavior, and the standard library. There's just one problem: it's *old*. The last major update was in 1988. This leads to amusing anachronisms, such as the intro to a section about function arguments:

> One aspect of C functions may be unfamiliar to programmers who are used to some other languages, particularly Fortran. In C, all function arguments are passed "by value."<sup>[\[1\]](#ref_1)</sup>

Humor aside, the book's age does hurt its educational value. Omissions include:

- `//`-style comments
- [Inline functions](https://en.wikipedia.org/wiki/Inline_function)
- `snprintf()`
- Types such as `bool` and `long long`
- Variable-length arrays
- [Variadic macros](https://en.wikipedia.org/wiki/Variadic_macro)

It's not essential for beginners to know these features, but a book about C should at least mention them. K&R also avoids any discussion of build systems (autotools), debuggers (gdb, lldb), or profilers (gprof, dtrace). That's more understandable though. These tools either didn't exist or were in their infancy when the book was authored. Considering how dated those sections would now be, it's probably good that they're missing.

I think Kernighan & Ritchie never had the goal of covering anything outside the language itself. And that's the main reason why I can't recommend K&R to beginners. It lacks any sort of "getting started" section. It has no guides for setting up a development environment. There's no chapter on how to install and use a compiler. Again, I realize these sections would be completely out-of-date had they existed in the 1988 book. Still, it's important that programming language books help users set up development environments.

In short: K&R is part of a solid intro to C, but it's not enough. It needs a few updates to reflect modern C. More importantly, it needs a companion book to cover setup and tooling. In its current form, it serves as more of an overview and reference.

---

1. <span id="ref_1"></span>Section 1.8: Arguments – Call by value. For those who may not know: Today, pass by value is the most popular design in modern languages.
2. <span id="ref_2"></span>I'd dabbled in [QBasic](https://en.wikipedia.org/wiki/QBasic) and [TI-BASIC](https://en.wikipedia.org/wiki/TI-BASIC), but it was mostly tweaking other people's code, not writing anything substantial.
