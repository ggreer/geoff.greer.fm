---
date: '2015-12-25 08:35:18'
layout: post
slug: fsevents-tools-watch-a-directory-for-changes
published: true
title: 'FSEvents Tools: Watch a Directory for Changes'
categories:
- fsevents
- Computers
---

Often, I want something to automatically happen when files in a certain directory change. For example: If I'm editing some source code locally, I might want to rsync it over to a remote server. Maybe I want to regenerate some CSS after changing some LESS or SASS, or minify some JavaScript after changing the uncompressed source. Sometimes, there's an application-specific solution to this problem. Sometimes, there isn't. In the latter case, it'd be nice to fall back on a general purpose tool.

On Linux, this is a solved problem. You can install [`inotify-tools`](https://github.com/rvoicilas/inotify-tools) and wrap it with a couple of scripts. Unfortunately, that won't work on OS X, because operating systems have different APIs for monitoring filesystem changes.

Enter `fsevents-tools`. As of this writing, it consists of three commands:

### `notifywait`

`notifywait` is the tool that everything else is built upon. It does one thing: Given path(s) to watch, it waits until something is changed in them and then exits. For example, if you have public file sharing enabled and you're expecting an incoming file, just run:

{% highlight text %}
% notifywait ~/Public/Drop\ Box && say "Dropbox changed"
{% endhighlight %}

The output will be something like…

{% highlight text %}
Path is /Users/ggreer/Public/Drop Box
Watching /Users/ggreer/Public/Drop Box
Change 18158642688910021128 in /Users/ggreer/Public/Drop Box/untitled folder, flags 131328 - matched directory, notifying
{% endhighlight %}

…followed by your computer talking.


### autorsync


### notifywatch


[Signed releases are available here](/fsevents/). If you want to see the source code (it's very short), visit [fsevents-tools on GitHub](https://github.com/ggreer/fsevents-tools).

