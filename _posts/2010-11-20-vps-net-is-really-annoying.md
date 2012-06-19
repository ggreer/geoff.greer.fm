---
date: '2010-11-20 03:55:10'
layout: post
slug: vps-net-is-really-annoying
status: publish
title: VPS.net is Really Annoying
wordpress_id: '769'
categories:
- Computers
---

I'm writing this because I am annoyed at [VPS.net](http://www.vps.net/). I wanted a server in the UK so I could use things like [Spotify](http://en.wikipedia.org/wiki/Spotify) and [BBC iPlayer](http://www.bbc.co.uk/iplayer/tv). [Cloudkick](https://www.cloudkick.com/) supports [Linode](http://www.linode.com/) and VPS.net. Both are closer to normal virtual private server providers than "true" cloud providers.\[1\] Linode billed monthly and VPS.net offered daily billing, so I went with the latter. The signup process was typical, except that I was asked to fill out four security questions. I entered stupid nonsensical answers, since while many people know my mother's maiden name, nobody knows my current passwords and I am unlikely to forget them. Not long after signing up, I received a confirmation e-mail... containing my password in plaintext.

E-mailing me my password tells me several things about your company. It tells me that you store passwords in plaintext instead of hashing them. If anyone gets ahold of a DB dump, they'll have passwords and e-mail addresses. Lots of people use the same password everywhere, making their e-mail vulnerable. E-mailing my password also tells me that you don't either don't know or don't care about the dangers of sending secrets via e-mail. E-mail isn't always encrypted and messages are often relayed through many servers. Anyone with access to one of those servers could see my password. 

The password thing was a big red flag, but I didn't want to give up so easily. I booted a server and started screwing around with it. I renamed my server in the VPS.net dashboard. Suddenly, my ssh session died. It turns out that renaming a server reboots it without warning. Frustrated, I gave up and decided to try again when I had more patience.

I woke up and saw my inbox contained an invoice for $1.00. Yes, VPS.net sends an invoice every day. Worse, after a week, VPS.net started warning me that my invoices were overdue. I tried to log in and pay the measly $10. I was confronted with a login page asking me to enter my username, password, and answer some security questions. They noticed I was trying to log in from a different IP address and threw some security questions at me. I finally managed to get enough answers correct to log in.

[![](/images/Screen-shot-2010-11-11-at-1.06.18-AM-500x242.png)](/images/Screen-shot-2010-11-11-at-1.06.18-AM.png)

That "Pay Now" button is actually a "try to pay $1 and show a big failure message, but mark the invoice as paid if there have been no payment attempts in the past few hours" button. I had to click it once for each invoice, waiting 3-4 hours between tries if I wanted them to work. Later I noticed the charges actually showed up on my card. 

There were other things I noticed, such as sequential instance IDs. Did you know VPS.net has only booted a total of 33,000 instances? Anyway, after the invoice thing I wrote VPS.net off as amateurs and tried out Linode. I've had no problems with Linode. Their stuff works without annoying the hell out of me. If you want a server in the UK, go with them.

1. The litmus test I use is, "Can I make an API call and get a booted server in under 5 minutes?" If not, then it's not really cloud computing. It's more of a reasonably fast VPS provider. 
