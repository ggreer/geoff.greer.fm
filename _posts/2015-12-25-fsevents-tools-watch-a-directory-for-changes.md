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


### notifywait

`notifywait` is a simple tool that the other utilities depend on. It does one thing: Given path(s) to watch, it waits until something in them changes and exits. For example, if you have public file sharing enabled and you're expecting an incoming file, just run:

{% highlight text %}
% notifywait ~/Public/Drop\ Box && say "Dropbox changed"
{% endhighlight %}

The output will be something like…

{% highlight text %}
Path is /Users/ggreer/Public/Drop Box
Watching /Users/ggreer/Public/Drop Box
Change 18158642688910021128 in /Users/ggreer/Public/Drop Box/untitled folder, flags 131328 - matched directory, notifying
{% endhighlight %}

…followed by your computer talking. Note: `notifywait` will exit if a file or directory is deleted as well, so it might alert for more things than you want.


### notifyloop

`notifyloop` takes a path and a command. When something in `path` changes, it runs `command`. For example, if you have a bunch of LESS in `styles/` and you want to rebuild CSS when they change, you'd do something like this:

{% highlight text %}
ggreer@carbon:~/code/geoff.greer.fm% notifyloop styles ./rebuild_less.sh
Watching styles
Path is /Users/ggreer/code/geoff.greer.fm/styles
Watching /Users/ggreer/code/geoff.greer.fm/styles
Change 18158642688910117872 in /Users/ggreer/code/geoff.greer.fm/styles/main-light.css, flags 70656 - matched directory, notifying
Running ./rebuild_less.sh
lessc styles/colors.less styles/colors.css
lessc styles/countdown.less styles/countdown.css
lessc styles/hexagons.less styles/hexagons.css
lessc styles/main-dark.less styles/main-dark.css
lessc styles/main-light.less styles/main-light.css
Path is /Users/ggreer/code/geoff.greer.fm/styles
Watching /Users/ggreer/code/geoff.greer.fm/styles
{% endhighlight %}

Notice that, although `regenerate_less.sh` changed CSS files in `styles/`, `notifyloop` did not go into an infinite regress. That's because `notifyloop` waits until `command` has finished before resuming monitoring changes.

While simple, `notifyloop` is very flexible. You'll probably use it more than the other tools.


### autorsync




[Signed releases are available here](/fsevents/). If you want to see the source code (it's very short), visit [fsevents-tools on GitHub](https://github.com/ggreer/fsevents-tools).

