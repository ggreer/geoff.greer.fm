---
date: '2008-03-24 18:42:01'
layout: post
slug: new-bloglines-feature-videos-in-feeds
status: publish
title: 'New Bloglines Feature: Videos in Feeds'
wordpress_id: '45'
categories:
- Computers
- Videos
---

For the past couple of months my greatest annoyance about [Bloglines](http://beta.bloglines.com/) was that it stripped out all &lt;object&gt; and &lt;embed&gt; tags for security reasons. This is fine and good, except that most feeds embed videos using these tags instead of as RSS attachments. [Google Reader](http://reader.google.com/) has supported a [whitelist of sites](http://googlereader.blogspot.com/2007/01/getting-embedded-in-google-reader.html) for over a year now. I finally got around to fixing the Bloglines security filter so that videos will show up. Below is the current whitelist. Any &lt;embed&gt; or &lt;object&gt; from these domains will not be stripped:

* blip.tv
* blogtv.com
* blowery.org
* break.com
* brightcove.com
* castfire.com
* cnet.com
* cnn.net
* collegehumor.com
* dailymotion.com
* dotsub.com
* ehow.com
* google.com
* gametrailers.com
* gamevideos.com
* glumbert.com
* grouper.com
* ifilm.com
* jumpcut.com
* kontraband.com
* liveleak.com
* metacafe.com
* mobatalk.com
* monstersandcritics.com
* motionbox.com
* myspace.com
* podtech.net
* podshow.com
* revver.com
* reuters.com
* sapo.pt
* singshot.com
* slideshare.net
* ustream.tv
* verycd.com
* videoegg.com
* vimeo.com
* vsocial.com
* youtube.com

I made this list by asking my co-workers for video sites. If I'm missing something, post a comment and I'll throw it on the TODO list. 

Oh, and the obligatory demonstration of this feature:

<embed src="https://www.youtube.com/v/VhnVQizc69c?version=3&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" width="640" height="480" allowscriptaccess="always" allowfullscreen="true">
</embed>
