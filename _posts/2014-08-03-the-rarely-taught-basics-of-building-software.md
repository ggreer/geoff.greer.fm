---
date: '2014-08-03 23:13:57'
layout: post
slug: the-rarely-taught-basics-of-building-software
published: false
title: The Rarely-Taught Basics of Building Software
categories:
  - Computers
---

I often forget how bad software development can be in inexperienced groups. Many of the development practices are similar to [Hobbes's account of primitive man](http://en.wikisource.org/wiki/Leviathan/The_First_Part#Chapter_XIII:_Of_the_Natural_Condition_of_Mankind_as_Concerning_Their_Felicity_and_Misery), life is "...solitary, poor, nasty, brutish, and short." And just like primitive man, these people don't realize how much better life can be.

It doesn't have to be this way. The tools I take for granted are software. Copying them is free. The only cost is the time one needs to learn the tool. What's lacking is knowledge. People need to know how to use these tools. They need to know what problems these tools solve. Most importantly, they need to know these tools exist.

What follows is an outline of what I consider the fundamentals. These are things I take for granted. Lacking them is like lacking electricity or flush toilets.

### Source Control

Subversion. Git. Mercurial. It doesn't matter what you use. *Anything* is better than no source control. Even if you are the *only* person working on the code, **use version control!** It's not hard to set up. It's not hard to use.

{% highlight text %}
git init
{% endhighlight %}

### Backups

I think everyone should experience a hard drive crash in elementary school. Better to learn the lesson of backups when one has little to lose. If you lack backups, you *will* lose important data. 


### SSH Keys

Using password auth with ssh is a bad idea. SSH keys 

Generate an SSH key.

{% highlight text %}
ssh-keygen
{% endhighlight %}


### Avoid Root

Use sudo instead of root. This makes it a little bit easier to avoid expensive mistakes.

While you're at it, disable root logins over ssh. It's common for people to scan for ssh servers and guess common root passwords.


