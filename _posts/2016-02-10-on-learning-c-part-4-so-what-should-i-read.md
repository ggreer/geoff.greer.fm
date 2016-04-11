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

I really did learn C the hard way. I was twelve years old, and it was my first real programming language.<sup>[\[2\]](#ref_2)</sup> Thanks to some luck and an advanced placement test, I'd gotten into CS121 at Gonzaga University.

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

That's right, a single equals in a conditional. All that effort and frustration for a single character. I've quoted him before, but [Douglas Crockford](http://www.crockford.com/) [said it best](http://www.youtube.com/watch?v=taaEzHI9xyY#t=26m50s):

>I think there has to be something seriously wrong with you in order to do this work. A normal person, once they've looked into the abyss, will say, "I'm done. This is stupid. I'm going to do something else." But not us, 'cause there's something really wrong with us.

---

## So what should I read?

If you are looking to learn C, 
