---
date: '2016-08-26 20:51:37'
layout: post
slug: gnome-terminal-cursor-blinking-saga
published: true
title: 'GNOME Terminal Cursor Blinking Saga'
categories:
- Computers
---

When setting up a new computer, one of the first things I do is disable cursor blinking in the terminal. I'm not the only one annoyed by an incessantly blinking square. Most terminal emulators have an option to disable blinking. For the past decade, the GNOME team has been working as hard as possible to make this

![](/images/gnome_terminal_cursor_blinking.png)

http://www.jurta.org/en/prog/noblink#GNOME_Terminal


https://wiki.gnome.org/action/show/Apps/Terminal/FAQ?action=show&redirect=Terminal%2FFAQ#How_can_I_stop_the_cursor_from_blinking.3F


```
gconftool-2 --set "/apps/gnome-terminal/profiles/Default/cursor_blink" \
            --type boolean "False"
```

In GNOME 3, the command changed.

https://git.gnome.org/browse/gnome-terminal/tree/src/org.gnome.Terminal.gschema.xml


```
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:UUID/ cursor-blink-mode off
```

```
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:$(gsettings get org.gnome.Terminal.ProfilesList default|tr -d \')/ cursor-blink-mode off
```


[Bug 342921 - Cursor blinking preference should follow system defaults](https://bugzilla.gnome.org/show_bug.cgi?id=342921)

[Bug 533522 - Alllow override of system blink preference](https://bugzilla.gnome.org/show_bug.cgi?id=533522)

![OS X](/images/Screen Shot 2016-08-27 at 14.38.07.png)
