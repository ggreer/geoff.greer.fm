---
date: '2012-07-02 07:25:02'
layout: post
slug: jekyll-gallery-plugin
title: 'Jekyll Gallery Plugin'
published: true
categories:
- Computers
- Ruby
---

I've tried hosting my photos all over the place: [Flickr](http://www.flickr.com/photos/ggreer), [Gallery](http://gallery.menalto.com/), and Wordpress. [Making my site 100% static](/2012/02/21/from-wordpress-to-jekyll/) forced me to get rid of Wordpress and Gallery, so I made [a Jekyll plugin](https://github.com/ggreer/jekyll-gallery-generator) that generates galleries from directories of images. It's very simple, but it meets my needs. [See the results for yourself](/photos/).

Writing this plugin was my first time using [Ruby](http://en.wikipedia.org/wiki/Ruby_%28programming_language%29) in years. Most of my recent work has been C, Python, and Node.js. I've made [my views on Node](/2012/06/10/nodejs-dealing-with-errors/) quite clear. Python is what I typically use for getting things done, and C is my weapon of choice when speed is essential. Ruby is similar to Python, but it has some nice syntactic sugar. There are annoyances, of course, but Ruby's surprises have been mostly pleasant. I hope to use it more often.

One more thing: Now that my site is 100% static, I've moved it onto Amazon S3. I tried to use Rackspace Cloud Files, but they don't support custom 404 pages. [The API docs claim to](http://docs.rackspace.com/files/api/v1/cf-devguide/content/Set_Error_Pages_for_Static_Website-dle4005.html), but it doesn't actually work. I've had a support ticket open for a month and it's still not fixed. `:(`
