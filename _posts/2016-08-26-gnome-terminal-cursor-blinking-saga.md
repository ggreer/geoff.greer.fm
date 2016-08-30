---
date: '2016-08-26 20:51:37'
layout: post
slug: gnome-terminal-cursor-blinking-saga
published: true
title: 'GNOME Terminal Cursor Blinking Saga'
categories:
- Computers
- Rant
---

When setting up a new computer, one of the first things I do is disable cursor blinking in the terminal. I'm not alone in being annoyed by an incessantly blinking square. Most terminal emulators have an option to disable blinking. For the past decade, the GNOME team has been diligently working to make this as hard as possible.

<img alt="On. Off. On. Off. On. Off..." src="/images/gnome_terminal_cursor_blinking.gif" style="" />

The story begins in 2006. Back then, GNOME Terminal had a checkbox in its settings:

![GNOME Terminal Settings in Ubuntu 6.06](/images/gnome_terminal_ubuntu_6.png)

Unchecking it would stop the cursor from blinking. It was simple and accessible, exactly the kind of UI that has no place in a Gnome project. Some Gnome developers decided to "simplify" things by going, "…on a quest to remove all annoying tiny little bits in GNOME's UI." Instead of having a checkbox, wanted to obey the global system setting for all cursors blinking (in text editors, browser URL bars, etc). Hence [Bug 342921 - Cursor blinking preference should follow system defaults](https://bugzilla.gnome.org/show_bug.cgi?id=342921). The checkbox was removed in Gnome v2.22, and the only way to disable blinking was to turn it off in the entire Gnome UI. This annoyed many people, as a giant blinking block is far more annoying than a thin blinking line. Users responded quickly. They issues such as [Bug 533522 - Alllow override of system blink preference](https://bugzilla.gnome.org/show_bug.cgi?id=533522) and [Bug 534207 - Something to fix the cursor blinking problem soon](https://bugzilla.gnome.org/show_bug.cgi?id=534207). Gnome was going through a UI freeze at the time, so the fix was to create another gconf setting. Now, to disable terminal blinking, you had to run:

```
gconftool-2 --set "/apps/gnome-terminal/profiles/Default/cursor_blink" \
            --type boolean "False"
```

Good luck figuring that out on your own. Fortunately, the magic invocation was quickly documented on Stack Overflow. It even made its way to [a site dedicated to stopping cursor blinks](http://www.jurta.org/en/prog/noblink#GNOME_Terminal). And that's how things stayed… until Gnome 3.

Soon after the release of Gnome 3, this issue was created: [Bug 702901 - Disabling blinking cursor not working](https://bugzilla.gnome.org/show_bug.cgi?id=702901). The magic invocation no longer appeased the Gnome gods.


[Bug 559990 - Add UI for the cursor blink preference](https://bugzilla.gnome.org/show_bug.cgi?id=559990)

https://wiki.gnome.org/action/show/Apps/Terminal/FAQ?action=show&redirect=Terminal%2FFAQ#How_can_I_stop_the_cursor_from_blinking.3F


In GNOME 3, the command changed.

https://git.gnome.org/browse/gnome-terminal/tree/src/org.gnome.Terminal.gschema.xml


```
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:UUID/ cursor-blink-mode off
```

```
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:$(gsettings get org.gnome.Terminal.ProfilesList default|tr -d \')/ cursor-blink-mode off
```


![OS X Terminal.app settings](/images/Screen Shot 2016-08-27 at 14.38.07.png)

A non-blinking cursor is the default in OS X, by the way.
