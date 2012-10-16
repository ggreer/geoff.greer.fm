---
date: '2010-04-23 17:34:27'
layout: post
slug: is-my-credit-card-stolen
status: publish
title: Is My Credit Card Stolen?
wordpress_id: '467'
categories:
- Computers
---

[Paul](http://journal.paul.querna.org/) bought [ismycreditcardstolen.com](http://ismycreditcardstolen.com/) a couple days ago. [AJ](http://aj.slater.net/) came up with the idea a while back, but Paul's purchase of the domain drove me to throw together a site. The goal was to educate gullible people about phishing while amusing the technically-inclined.

With some help from friends ([Ben Lowery](http://blowery.org/) and [Bjorn Tipling](http://bjorn.tipling.com/)), I cleaned up the styling and made sure that the credit card details were never sent across the wire. 

[I submitted the link to Hacker News](http://news.ycombinator.com/item?id=1286880), where it was rather well-received. Everyone got the joke. Some even offered suggestions to improve the text of the warning message.

The site quickly became popular. [People on Twitter talked about it](http://twitter.com/#search?q=ismycreditcardstolen). 

That's when things started going south. A decent number of [people](http://twitter.com/badwebsites/statuses/12672928201) [didn't](http://twitter.com/kisasondi/statuses/12717240592) [get](http://twitter.com/privacycommons/statuses/12672938161) [the](http://twitter.com/robertobrien/status/12672594696) [joke](http://twitter.com/dgapeev/statuses/12690786526). They thought it was a real phishing site. Among them was [this guy](http://twitter.com/bobmcardle/status/12692632353), supposedly a researcher at antivirus company [Trend Micro](http://us.trendmicro.com/us/home/). Google Analytics shows about half of the visitors actually clicked the submit button. I'm guessing the other half didn't see the "This was a test. You failed." message and assumed it was a phishing site.)

I normally don't care about idiots on the Internet, but enough Firefox users reported it as a phishing site that it got blacklisted. Now if you try to visit it in any modern browser, you'll get a giant warning. Even worse, sites like Twitter use the Firefox phishing blacklist to filter links, so nobody can link to the site now.

In a final bit of ridiculousness, [UK Yahoo News reported](http://uk.news.yahoo.com/16/20100423/ttc-security-group-creates-educational-p-6315470.html) that the [Anti-Phishing Working Group](http://www.antiphishing.org/) was responsible for creating ismycreditcardstolen.com. This misunderstanding wouldn't have happened if the reporter read the [about page](http://ismycreditcardstolen.com/about.html).

What have I learned from this? 

* People on Twitter are dumber than I thought.
* A small group can add any relatively-unpopular site to the Firefox phishing blacklist.
* Some "reporter" couldn't be troubled to click the about link on the front page of the site he wrote an article about.

Quite a few people have reported the site as being incorrectly flagged, but it hasn't done any good. I doubt it will ever be removed from the phishing blacklist. Oh well, it was fun while it lasted. And since Paul bought the domain I'm not out any money.


Update: I was wrong to be so pessimistic. It's removed from the phishing blacklist!
