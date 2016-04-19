---
date: '2016-02-10 22:30:00'
layout: post
slug: on-learning-c-part-4-so-what-should-i-read
published: true
title: 'On Learning C, Part 4: What Should I Read? Why Should I believe you?'
categories:
- Computers
- Learning C
---

{% include on_learning_c.md number=4 %}

## Why should I believe you?

I really did learn C the hard way. It was my first real programming language.[^1] Thanks to some luck and an advanced placement test, I'd gotten into CS121 at [Gonzaga University](https://en.wikipedia.org/wiki/Gonzaga_University). I was 12 years old.

I distinctly remember an early assignment where I was completely stumped by a bug. I'd almost finished the program, but there was one issue that I couldn't fix. An `if` statement was always evaluating to true, even when it shouldn't. The `else` was never taken. The program compiled without warnings. It was incredibly frustrating.

I spent *two days* staring at that code. I didn't know about debuggers, so I peppered my code with `printf()`s. I commented and uncommented chunks of code. No matter what I tried, I simply couldn't understand why the program was misbehaving. I was almost in tears when I asked my dad for help. He saw the problem in seconds:

{% highlight c %}
if (a = b) {
  ...
} else {
  ...
}
{% endhighlight %}

I had a single equals in a conditional. That meant I was assigning `a` to `b` instead of comparing them. As soon as I added another equals, my program worked flawlessly. All that effort and frustration was caused by a single missing character.[^2]

I'm still surprised that, afterwards, I remained interested in writing code. I've quoted him before, but [Douglas Crockford](http://www.crockford.com/) [said it best](http://www.youtube.com/watch?v=taaEzHI9xyY#t=26m50s):

>I think there has to be something seriously wrong with you in order to do this work. A normal person, once they've looked into the abyss, will say, "I'm done. This is stupid. I'm going to do something else." But not us, 'cause there's something really wrong with us.


## So what should I read?

If you are looking to learn C, 

http://www.amazon.com/Computer-Systems-Programmers-Perspective-Edition/dp/0136108040

http://www.amazon.com/Linux-Kernel-Development-3rd-Edition/dp/0672329468



---

[^1]: Before that, I'd only written a few toy programs in [Logo](https://en.wikipedia.org/wiki/Logo_%28programming_language%29), [QBasic](https://en.wikipedia.org/wiki/QBasic), and [TI-BASIC](https://en.wikipedia.org/wiki/TI-BASIC).

[^2]: If you're wondering why the compiler didn't warn about this, it's because this happened in 1998. Back then, gcc didn't warn about assignments in conditionals. Nowadays, any sane compiler will complain. How fortunate one is to learn C today. :)
