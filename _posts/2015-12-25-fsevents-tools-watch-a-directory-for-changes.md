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

Often, when I modify files in a directory, I want some action to happen afterwards. For example: If I'm editing some source code locally, I might want it to be rsynced to a remote server. Or maybe I want to regenerate CSS after changing some [LESS](http://lesscss.org/) or [SASS](http://sass-lang.com/), or minify some JavaScript after changing the uncompressed source. Sometimes, there's an application-specific solution to this problem. Sometimes, there isn't. In the latter case, it would be nice to fall back on a general purpose tool.

On Linux, this is a solved problem. Just install [`inotify-tools`](https://github.com/rvoicilas/inotify-tools) and wrap it with a couple of scripts. Sadly, each operating system has its own unique API for monitoring filesystem changes. That means Windows and Mac users are out of luck.

[`fsevents-tools`](/fsevents/) is my attempt to solve this problem for OS X. As the name implies, it uses OS X's [FSEvents API](https://en.wikipedia.org/wiki/FSEvents) to monitor filesystem changes. The first release (v1.0) consists of three commands:


### notifywait

`notifywait` is a simple tool that the other utilities depend on. It does one thing: Given path(s) to watch, it waits until something in them changes and exits. For example, if you have public file sharing enabled and you're expecting an incoming file, run:

{% highlight text %}
% notifywait ~/Public/Drop\ Box && say "Dropbox changed"
{% endhighlight %}

The output will be something like…

{% highlight text %}
Path is /Users/ggreer/Public/Drop Box
Watching /Users/ggreer/Public/Drop Box
Change 18158642688910021128 in /Users/ggreer/Public/Drop Box/untitled folder, flags 131328 - matched directory, notifying
{% endhighlight %}

…followed by your computer talking. Note: `notifywait` will also exit if a file or directory is moved or deleted. In this specific example, that's probably more than you want.


### notifyloop

`notifyloop` takes a `path` and a `command`. When something in `path` changes, it runs `command`. For example, if you have a bunch of LESS in `styles/` and you want to rebuild CSS when they change, you'd do something like this:

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

Finally, there's `autorsync`. It takes a `path` and a remote destination. If anything in `path` changes, it [rsyncs](https://en.wikipedia.org/wiki/Rsync) `path` to the remote. In the following example, I copy the source for [ag](/ag/) to my home server. Since the repo was out of date on that server, my first save of `decompress.c` causes a lengthy rsync. As expected, the second save rsyncs much faster. Here's the command and output:

{% highlight text %}
ggreer@carbon:~/code% autorsync ag lithium.local:code/
Watching ag
Path is /Users/ggreer/code/ag
Watching /Users/ggreer/code/ag
Change 18158642688910848099 in /Users/ggreer/code/ag/src/decompress.c, flags 70656 - matched directory, notifying
Running rsync -avz ag lithium.local:code/
building file list ... done
ag/
...
sent 2882666 bytes  received 52598 bytes  1174105.60 bytes/sec
total size is 6612119  speedup is 2.25
Path is /Users/ggreer/code/ag
Watching /Users/ggreer/code/ag
Change 18158642688910848167 in /Users/ggreer/code/ag/src/decompress.c, flags 70656 - matched directory, notifying
Running rsync -avz ag lithium.local:code/
building file list ... done
ag/src/decompress.c

sent 36800 bytes  received 114 bytes  73828.00 bytes/sec
total size is 6612119  speedup is 179.12
Path is /Users/ggreer/code/ag
Watching /Users/ggreer/code/ag
...
{% endhighlight %}

…and so on.

Those who use GUI editors will likely recognize the value of `autorsync`. No longer will you have to ssh in and make changes using Vim or Emacs. Nor will you have to manually copy files or set up [sshfs](https://github.com/osxfuse/osxfuse/wiki/SSHFS). With one command, everything gets synced to the remote server.

<br />

I hope you find these tools as useful as I do. [Signed releases are available here](/fsevents/). The source code is on [GitHub at ggreer/fsevents-tools](https://github.com/ggreer/fsevents-tools).
