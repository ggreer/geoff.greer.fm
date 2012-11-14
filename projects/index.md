---
layout: page
title: Projects
---

Here are some things I've made. See [GitHub](https://github.com/ggreer) for more.

## [Floobits](https://floobits.com/)
Like EtherPad, but with plugins for popular code editors. The buzz-wordy term is "cross-editor real-time collaboration." It's not ready for general use yet, but I promise it will be super-cool in the near future.
#### Related posts
{% for post in site.categories.Floobits %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [The Silver Searcher](https://github.com/ggreer/the_silver_searcher)
A tool for searching code. Faster than [Ack](http://betterthangrep.com/). Better than grep.  
#### Related posts
{% for post in site.categories.the_silver_searcher %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [FSEvents tools](https://github.com/ggreer/fsevents-tools)
Some command-line tools for working with [OS X's filesystem events](http://en.wikipedia.org/wiki/FSEvents). Similar to [inotify-tools](https://github.com/rvoicilas/inotify-tools).

<br />

## [LS_COLORS generator](/lscolors)
For Linux, OS X, and \*BSD. I made this many years ago. I would destroy it out of embarrassment, but people  still seem to use it.  
#### Related posts
{% for post in site.categories.ls_colors %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [Twisted hang detector](https://github.com/ggreer/twisted_hang)
Find out what's causing the reactor thread to hang.
#### Related posts
{% for post in site.categories.twisted_hang %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [Memex Trails](https://github.com/ggreer/memex_trails)
A Chrome extension to help you figure out the path you took to get to a site.
