---
date: '2012-05-02 23:13:57'
layout: post
slug: the-basics-of-building-software
status: publish
title: The Basics of Building Software
categories: computers
---

I often forget how bad software development can be in inexperienced groups. Many of the development practices are quite primitive. Similar to [Hobbes's account of primitive man](http://en.wikisource.org/wiki/Leviathan/The_First_Part#Chapter_XIII:_Of_the_Natural_Condition_of_Mankind_as_Concerning_Their_Felicity_and_Misery), life is "...solitary, poor, nasty, brutish, and short." And just like primitive man, these people don't realize how much better life can be.

It doesn't have to be that way. The tools I take for granted are all software. Copying them is practically free. The only cost is the time one needs to learn the tool. What's lacking is knowledge. People need to know how to use these tools. They need to know what problems these tools solve. Most importantly, they need to know these tools exist.

What follows is an overview of the fundamentals. These are things I take for granted. Lacking them is like lacking electricity or flush toilets.

###Version Control

Subversion. Git. Mercurial. It doesn't matter what you use. *Anything* is better than no version control. Even if you are the *only* person working on the code, **use version control!** It's not hard to set up. It's not hard to use.

{% highlight text %}
git init
{% endhighlight %}

###SSH Keys

Generate an SSH key.

{% highlight text %}
ssh-keygen
{% endhighlight %}

###Root is harmful

Use sudo instead of root. This makes it a little bit easier to avoid expensive mistakes.

While you're at it, disable root logins over ssh. It's common for people to scan for ssh servers and guess common root passwords.
