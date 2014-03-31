---
layout: page
title: Projects
---

Here are some things I've made. See [GitHub](https://github.com/ggreer) for more.

<br />

## [Floobits](https://floobits.com/)
Like [Etherpad](http://en.wikipedia.org/wiki/Etherpad), but with plugins for popular code editors. The buzz-wordy term is "cross-editor real-time collaboration platform." (Excuse me while I wash my mouth out with soap.) Basically, it lets developers pair program when they're not in the same room. It's super-cool. My co-founder and I use Floobits to develop Floobits.

Much of the code I write these days is under the [Floobits GitHub organization](https://github.com/Floobits).
#### Related posts
{% for post in site.categories.floobits %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [The Silver Searcher](/ag/) &nbsp;<small>([GitHub project](https://github.com/ggreer/the_silver_searcher))</small>
A tool for searching code. Faster than [Ack](http://betterthangrep.com/). Better than grep.  

On GitHub, Ag now has over 3,000 stargazers, making it the [11th most popular project written in C](https://github.com/search?l=C&o=desc&p=2&q=stars%3A%3E1000&ref=advsearch&s=stars&type=Repositories). I'm glad so many people find this tool useful.

#### Related posts
{% for post in site.categories.the_silver_searcher %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [FSEvents tools](/fsevents/) &nbsp;<small>([GitHub project](https://github.com/ggreer/fsevents-tools))</small>
Some command-line tools for working with [OS X's filesystem events](http://en.wikipedia.org/wiki/FSEvents). Similar to [inotify-tools](https://github.com/rvoicilas/inotify-tools).

{% if site.categories.fsevents|size %}
#### Related posts
{% endif %}
{% for post in site.categories.fsevents %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

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
