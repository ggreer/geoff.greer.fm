---
date: '2009-05-05 23:26:12'
layout: post
slug: refresh-cannon-bot
status: publish
title: Refresh Cannon Bot
wordpress_id: '271'
categories:
- Computers
---

I stumbled on [Refresh Cannon](http://blog.classicalcode.com/?p=471) today. The entire "game" (it's extremely simple) is controlled by refreshing your browser. The goal is to use a cannon to hit a house on the other side of the screen. The first refresh starts increasing the cannon's angle, the second refresh locks-in the angle and begins increasing the power. The final refresh locks-in the power and fires. 

![lose](http://geoff.greer.fm/rambling/wp-content/uploads/2009/05/img.png)

The angle goes from 0-90º over 10 seconds, so half a second is the difference between 75º and 79.5º. Since the novelty of refreshing your browser gets old **extremely** quickly, I wrote a Ruby script to give myself the high score. The script just tries a bunch of angles and powers that are likely to result in a hit. I have no clue how to do image processing in Ruby, so I just checked the HTTP response size. The "Win!" image is usually about 1k larger than the "Miss!" image.

![win1](http://geoff.greer.fm/rambling/wp-content/uploads/2009/05/win1.png)

Unfortunately, it looks like somebody else wrote their own script and started running it several hours before I discovered the blog post. <del>I'll have to settle with second place.</del> Update: I am now in 1st place.

I didn't put much effort into the angle/power guessing, since latency screws up any attempt to methodically carpet bomb the map. I account for constant latency, but jitter is bad enough that trying the same times between HTTP requests will cause the cannonball to land only in the general area intended.

[Here's my script, in case you're curious.](/code/refresh_cannon.rb) Yes yes, I know it's hideous. 

If I felt like wasting more than an hour on this, it could be improved by:




  * Storing success rates of angle/power pairs, then trying the most successful pairs first.


  * Registering multiple IPs to the same username, allowing multiple copies of the bot to increase a single user's score.


  * Using image processing and OCR to find the difference between the attempted angle/power and the actual angle/power.



