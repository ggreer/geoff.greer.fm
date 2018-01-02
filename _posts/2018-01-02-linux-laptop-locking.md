---
date: '2018-01-02 03:49:05'
layout: post
slug: linux-laptop-locking
published: true
title: 'Linux Laptop Locking'
categories:
- Computers
- Security
---

If you wrote your own systemd unit to lock your laptop on suspend, you might want to double-check its behavior. The top two Google results for ["systemd lock laptop on suspend"](https://www.google.com/search?q=systemd+lock+laptop+on+suspend) both provide examples that lock on *resume*, not suspend.[^google] This is a security risk.

How did I discover this? A few months ago, I switched to [Sway](http://swaywm.org/), a [tiling window manager](https://en.wikipedia.org/wiki/Tiling_window_manager) similar to [i3](https://i3wm.org/).[^ubuntu] Like i3, Sway requires a significant amount of configuration to get behaviors that Mac users take for granted.

One feature I wanted was to lock the screen when I closed my laptop's lid. Like any lazy programmer I googled some terms, consulted [the first Stack Exchange link](https://unix.stackexchange.com/questions/81692/suspend-and-lock-screen-on-closing-lid-in-arch-systemd), and created the necessary systemd unit:

{% highlight ini %}
[Unit]
Description=Lock the screen

[Service]
User=ggreer
Environment=DISPLAY=:0
ExecStart=/usr/local/bin/lock-screen

[Install]
WantedBy=suspend.target
{% endhighlight %}

This is a pretty straightforward unit. On suspend, run `lock-screen`. Unfortunately, it's wrong.

A few weeks after adding the unit, I opened my laptop and stared at an unlocked screen. Immediately, I delved into logs to figure out how this happened. It wasn't long before I found the answer: The system had failed to suspend [because of an sshfs mount](https://bugs.launchpad.net/ubuntu/+source/sshfs-fuse/+bug/1702368). This was a double surprise. I didn't know that:

1. A non-root process could prevent the kernel from suspending.
2. My systemd unit was locking after suspend instead of before.

[The fix](https://github.com/ggreer/dotfiles/commit/68876cb99073c4ebab7c4b3f88f7ced3933b12b5) didn't require changing much:

{% highlight diff %}
 [Unit]
 Description=Lock the screen
+Before=sleep.target
 
 [Service]
 User=ggreer
 Environment=DISPLAY=:0
 ExecStart=/usr/local/bin/lock-screen
 
 [Install]
-WantedBy=suspend.target
+WantedBy=sleep.target
{% endhighlight %}

Adding "`Before=...`" forces systemd to wait for `lock-screen` to start before suspending.[^systemd_unit] Using `sleep.target` is a little more robust, as `suspend.target` only covers suspending to RAM. Sleep covers suspending to RAM, suspending to disk, and [hybrid sleep](https://wiki.archlinux.org/index.php/Power_management#Hybrid_sleep).

If you're running a highly-customized Linux GUI, you'll probably never be as secure as stock Fedora or Ubuntu. A single mistake (such as the one I made) can leave your system totally vulnerable. Less popular window managers often lack basic exploit mitigation techniques such as [clearing passwords from memory](https://github.com/swaywm/sway/pull/1519).

---

[^google]: As of 2018-01-01, the top two results are [an Arch Linux forum post](https://bbs.archlinux.org/viewtopic.php?id=185301) and [a Stack Exchange answer](https://unix.stackexchange.com/questions/81692/suspend-and-lock-screen-on-closing-lid-in-arch-systemd). Both use `WantedBy=suspend.target` and omit `Before=...`.

[^ubuntu]: The release of Ubuntu 17.10 switched from Unity to Gnome Shell, making the user interface a nightmare. It's like they tried their hardest to annoy users. For example, joining a wifi network went from two clicks to five. I'd rather deal with stupid config files and alpha-quality tiling window managers than continue to use Gnome Shell.

[^systemd_unit]: More information on the behavior of `Before=` and `After=` can be found in [systemd's unit documentation](https://www.freedesktop.org/software/systemd/man/systemd.unit.html).
