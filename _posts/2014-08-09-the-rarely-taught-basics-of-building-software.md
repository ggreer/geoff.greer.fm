---
date: '2014-08-09 23:13:57'
layout: post
slug: the-rarely-taught-basics-of-building-software
published: true
title: The Rarely-Taught Basics of Building Software
categories:
  - Computers
---

I often forget how bad software development can be in inexperienced groups. Many of their development practices are similar to [Hobbes's account of primitive man](http://en.wikisource.org/wiki/Leviathan/The_First_Part#Chapter_XIII:_Of_the_Natural_Condition_of_Mankind_as_Concerning_Their_Felicity_and_Misery). Life is, "...solitary, poor, nasty, brutish, and short." And just like primitive man, these people don't realize how much better life can be.

It doesn't have to be this way. The tools I take for granted are software. Copying them is free. The only cost is the time one needs to learn the tool. What's lacking is knowledge. People need to know how to use these tools. They need to know what problems these tools solve. Most importantly, they need to know these tools exist.

What follows is an outline of what I consider the fundamentals. These are things I take for granted. Lacking them is like lacking electricity or flush toilets. Sadly, none of them were part of my CS education.

## Backups

This applies to everyone, but I'm still surprised by the number of highly technical people who don't have backups. If you lack backups, you *will* lose important data eventually. I wish everyone experienced a hard drive crash in elementary school. Better to learn the lesson of backups when one has little to lose.

No matter your OS, backups are easier than ever to set up:

* OS X has [Time Machine](http://support.apple.com/kb/HT1427).
* Windows has [File History](http://windows.microsoft.com/en-US/windows-8/how-use-file-history).
* Linux has no standard backup solution. Ubuntu has a backup utility, but it's a little rough around the edges and I've never tried restoring from it. Ubuntu's community wiki has [some decent docs on backups](https://help.ubuntu.com/community/BackupYourSystem).

I can't overstate the importance of backups. If you follow only once bit of advice in this post, **make backups**.


## Source Control

Source control keeps track of who changed what when. It makes it trivial to roll back to a known-good version. It keeps everyone accountable for their changes. It makes it very easy to see how a codebase changes over time. Even if you are the *only* person working on the code, **use source control!**

Subversion. Git. Mercurial. It doesn't matter what you use. *Anything* is better than no source control. Compared to programming, these tools aren't hard to learn. Every popular source control software has a free book associated with it:

* [Pro Git Book](http://www.git-scm.com/book)
* [Mercurial: The Definitive Guide](http://hgbook.red-bean.com/)
* [Version Control with Subversion](http://svnbook.red-bean.com/)


## SSH Keys

Using password auth with ssh is a bad idea. SSH keys allow you to authenticate without sending a secret to a remote server. The Arch Linux wiki has a great [guide to SSH keys](https://wiki.archlinux.org/index.php/SSH_Keys).


## Avoid Root

Use [sudo](https://en.wikipedia.org/wiki/Sudo) instead of root. This makes it a bit easier to avoid costly mistakes.

It's common for people to scan for ssh servers and guess common root passwords. To protect against this attack, disable root logins over ssh by setting `PermitRootLogin no` in `/etc/ssh/sshd_config`.


## Keep Improving

There are countless ways to improve the experience of developing and deploying software, and people create new tools daily. I've only outlined a few items that I consider absolutely basic. It's easy to let one's knowledge stagnate. Be sure to keep learning from books, friends, and coworkers. If you keep at it, one day you might try making your own dev tools.
