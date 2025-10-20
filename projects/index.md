---
layout: page
title: Projects
---

Here are some things I've made. See [GitHub](https://github.com/ggreer) for more.

<br />

## [Names](/names/)

A tool to search and filter given name data. I made this to get some ideas for baby names.

<br />

## [1990 Mazda Miata](/miata/)

My project car. I bought it in early 2023.

<br />


## [3D Printing](/3d/)

I got into 3D printing in early 2022. I mostly make things for myself, but many of my designs are useful for others.

<br />

<br />

## [Floobits](https://floobits.com/)
Like [Etherpad](http://en.wikipedia.org/wiki/Etherpad), but with plugins for popular code editors. The buzz-wordy term is "cross-editor real-time collaboration platform." Basically, it lets developers pair program when they're not in the same room. It's super-cool. At Floobits, we all work remotely, using Floobits to develop Floobits.

These days, much of the code I write is under the [Floobits GitHub organization](https://github.com/Floobits).
#### Related posts
{% for post in site.categories.Floobits %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [The Silver Searcher](/ag/) &nbsp;<small>([GitHub project](https://github.com/ggreer/the_silver_searcher))</small>
A tool for searching code. Faster than [Ack](http://betterthangrep.com/). Better than grep.  

Ag has over 4,000 stargazers on GitHub, making it the [9th most popular project written in C](https://github.com/search?l=C&o=desc&p=1&q=stars%3A%3E4000&ref=advsearch&s=stars&type=Repositories). I'm glad so many people find this tool useful.

#### Related posts
{% for post in site.categories.the_silver_searcher %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [FSEvents tools](/fsevents/) &nbsp;<small>([GitHub project](https://github.com/ggreer/fsevents-tools))</small>
Some command-line tools for working with [OS X's filesystem events](http://en.wikipedia.org/wiki/FSEvents). Similar to [inotify-tools](https://github.com/rvoicilas/inotify-tools).

#### Related posts
{% for post in site.categories.fsevents %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}

<br />

## [TLS CipherSuite config generator](/ciphersuite/)
It's not easy to configure nginx or httpd to use the right cipher suites. There are dozens of combinations of key exchange, encryption, and message authentication algorithms. Some combinations are secure, some aren't. This is a simple tool that lets you pick among the secure combinations to generate a `SSLCipherSuite` config directive.
{% if site.categories.ciphersuite %}
#### Related posts
{% for post in site.categories.ciphersuite %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}
{% endif %}

<br />

## [LS_COLORS generator](/lscolors/)
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

<!--
## [Memex Trails](https://github.com/ggreer/memex_trails)
A Chrome extension to help you figure out the path you took to get to a site.
-->