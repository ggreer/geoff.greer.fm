---
date: '2006-12-28 08:21:23'
layout: post
slug: wget-isnt-as-evil-as-hawaiian-airlines
status: publish
title: Wget isn't as Evil as Hawaiian Airlines
wordpress_id: '13'
categories:
- Computers
---

While I was waiting to board the plane from Hawaii to Seattle, I noticed an open wifi network. Of course it was your typical $5 for 2 hours deal that a lot of airports have, so I opened up snort to find a MAC address I could spoof to get free access. After about two minutes some traffic went by that made me do a double-take: I thought I saw my name fly by in plain text. Luckily I was logging all traffic to my hard drive, so I replayed the data and ran in through grep. Lo and behold, my name WAS in there. Hawaiian Airlines was using the open wireless network to transfer passenger information. What's worse is that their protocol was extremely simple. Passengers on flights are listed as last name, first name, followed by seat number. I searched for some nearby seat numbers and then asked the people if their names were X.


I didn't have much time to log data and go through it, but stuff like this makes me wonder just how much more information Hawaiian Airlines is sending out on the airwaves. If anyone wants to sift through the logs, you can get them (in tcpdump format) [here](/files/log.1167174454.txt). Oh, and I also noticed one of the computers on the network was running MSSQL, but I didn't have time to check it out.


It's just sad how many people (and companies) are totally clueless about computer security.
