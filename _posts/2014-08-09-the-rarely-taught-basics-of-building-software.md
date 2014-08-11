---
date: '2014-08-09 23:13:57'
layout: post
slug: the-rarely-taught-basics-of-building-software
published: true
title: The Rarely-Taught Basics of Building Software
categories:
  - Computers
---

I often forget how bad software development can be in inexperienced groups. Many of the development practices are similar to [Hobbes's account of primitive man](http://en.wikisource.org/wiki/Leviathan/The_First_Part#Chapter_XIII:_Of_the_Natural_Condition_of_Mankind_as_Concerning_Their_Felicity_and_Misery), life is "...solitary, poor, nasty, brutish, and short." And just like primitive man, these people don't realize how much better life can be.

It doesn't have to be this way. The tools I take for granted are software. Copying them is free. The only cost is the time one needs to learn the tool. What's lacking is knowledge. People need to know how to use these tools. They need to know what problems these tools solve. Most importantly, they need to know these tools exist.

What follows is an outline of what I consider the fundamentals. These are things I take for granted. Lacking them is like lacking electricity or flush toilets.

## Backups

This applies to everyone, but I'm still surprised by the number of highly technical people who don't have backups. If you lack backups, you *will* lose important data eventually. I wish everyone experienced a hard drive crash in elementary school. Better to learn the lesson of backups when one has little to lose.

No matter your OS, backups are easier than ever to set up:

* OS X has [Time Machine](http://support.apple.com/kb/HT1427).
* Windows has [File History](http://windows.microsoft.com/en-US/windows-8/how-use-file-history).
* Linux has no standard backup solution. Ubuntu has a backup utility, but it's a little rough around the edges and I've never tried restoring from it. Ubuntu's community wiki has [some decent docs on backups](https://help.ubuntu.com/community/BackupYourSystem).

I can't overstate the importance of backups. If you follow only once bit of advice in this post, **make backups**.


## Source Control

Source control tools keep track of who changed what when. They make it trivial to roll back to a known-good version. They keep everyone accountable for their changes. They make it very easy to see how a codebase changes over time. Even if you are the *only* person working on the code, **use source control!**

Subversion. Git. Mercurial. It doesn't matter what you use. *Anything* is better than no source control. Compared to programming, these tools aren't hard to learn. Every popular source control software has a free book associated with it:

* [Pro Git Book](http://www.git-scm.com/book)
* [Mercurial: The Definitive Guide](http://hgbook.red-bean.com/)
* [Version Control with Subversion](http://svnbook.red-bean.com/)


## SSH Keys

Using password auth with ssh is a bad idea. SSH keys 

Generate an SSH key.

{% highlight text %}
ssh-keygen
{% endhighlight %}


## Avoid Root

Use sudo instead of root. This makes it a little bit easier to avoid expensive mistakes.

While you're at it, [disable root logins over ssh](). It's common for people to scan for ssh servers and guess common root passwords.


## Teach Yourself to Fish

