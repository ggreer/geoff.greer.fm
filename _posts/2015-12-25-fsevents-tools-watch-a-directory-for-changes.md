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

Often, I want to watch a local directory fand do something when files in it change. For example, if I'm editing some source code locally, I might want to rsync it over to a remote server. It'd be nice to have that automatically happen whenever I save a file. Or maybe I want to regenerate some CSS after changing some LESS or SASS. Sometimes, there's an application-specific solution to this problem. Sometimes, there isn't.

This is a solved problem on Linux. Just install [`inotify-tools`](https://github.com/rvoicilas/inotify-tools) and wrap it with a couple of scripts. Unfortunately, that won't work on OS X. Every operating system seems to have its own API for watching a directory for changes. Linux uses [inotify](). Windows uses [](). OS X uses [FSEvents]().

Enter [`fsevents-tools`](/fsevents/).

See [the GitHub page](https://github.com/ggreer/fsevents-tools) for more info.



notifywait


autorsync


notifywatch

