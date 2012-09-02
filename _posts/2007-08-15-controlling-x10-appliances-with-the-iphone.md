---
date: '2007-08-15 02:17:44'
layout: post
slug: controlling-x10-appliances-with-the-iphone
status: publish
title: Controlling X10 Appliances with the iPhone
wordpress_id: '28'
categories:
- Computers
- Videos
---

Last week I ordered some [X10](http://en.wikipedia.org/wiki/X10_%28industry_standard%29) gear off Amazon to play with. Included was a CM17A Firecracker X10 controller. It plugs into a serial port and transmits X10 signals to a receiver hooked up to your power lines. I found a neat little open source program called [Heyu](http://heyu.tanj.com/) that lets you control the CM17A. Of course, controlling your X10 stuff from a command line isn't cool enough for me, so I started on a Ruby on Rails app that lets me control everything from my iPhone. After adding some  iUI styling it works pretty well. The Firecracker can only transmit, not receive data, so I had to store appliance state in the database. Besides that minor annoyance, everything worked out pretty well. I added [iUI](http://www.joehewitt.com/iui/) styling and I'm pretty happy with what I've got so far.

Anyone who wants to can check out the source [here](/repos/x10/). It's nowhere near done. There is no way to add houses or units short of making a migration or modifying the database directly. Also it requires that you have Heyu installed and in your path. Turning stuff on and off works though, as demonstrated by me in this video:

<iframe width="640" height="480" src="http://www.youtube.com/embed/UcsLqet4zK8" frameborder="0" allowfullscreen="true">
</iframe>

You can [download the video](/videos/x10/x10.mov) if for some reason you want to.

So far, my favorite thing to do is to turn off my air conditioner in the morning and then turn it on an hour before I come home in the evening. Since my schedule is so unscheduled, a cron job just doesn't cut it.
