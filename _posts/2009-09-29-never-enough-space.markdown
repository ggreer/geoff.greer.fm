---
date: '2009-09-29 15:41:31'
layout: post
slug: never-enough-space
status: publish
title: Never Enough Space
wordpress_id: '330'
categories:
- Computers
---

I ran out of space on my 4x500GB array so I upgraded all the drives to 1.5TB.

Before:

    
    
    geoff@lithium:/x1$ df -h /dev/md0 
    Filesystem            Size  Used Avail Use% Mounted on
    /dev/md0              1.4T  1.3T   14G  99% /x1
    


After:

    
    
    geoff@lithium:~$ df -h /dev/md0 
    Filesystem            Size  Used Avail Use% Mounted on
    /dev/md0              4.1T  1.5T  2.4T  39% /x1
    



At this rate I will fill up my new drives in approximately six months.

If you're thinking of growing an array, I found the [Linux Raid Wiki](http://linux-raid.osdl.org/index.php) to be more help than the md man pages.
