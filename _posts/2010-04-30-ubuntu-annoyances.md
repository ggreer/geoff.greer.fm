---
date: '2010-04-30 19:37:11'
layout: post
slug: ubuntu-annoyances
status: publish
title: Ubuntu Annoyances
wordpress_id: '423'
categories:
- Computers
---

Ubuntu 10.04 came out yesterday. It's probably the best desktop Linux distro out there, which is about as prestigious as being the best Yugoslavian car company. Here are a few simple things that have annoyed <del>me</del> users for years. I've included the year each bug was created along with links to any upstream bug reports I could find.

[Bug #11334: MASTER Copy-Paste doesn't work if the source is closed before the paste](https://bugs.launchpad.net/ubuntu/+bug/11334) (2004)

I don't know why this one has stuck around for so long. Fortunately, most of apps have been updated to work around the bug, but there is no good excuse for having clipboard functionality broken in a modern OS.

[Bug #20284: Keep Desktop icons automatically arranged](https://bugs.launchpad.net/nautilus/+bug/20284) (2005)  
Upstream: [Bug 172128 - Autosorting desktop icons](https://bugzilla.gnome.org/show_bug.cgi?id=172128)  
Related: [Bug #12608: 'keep aligned' does not work right](https://bugs.launchpad.net/ubuntu/+source/nautilus/+bug/12608)

If you delete or add icons (for example, by inserting or removing a USB drive), the desktop icons will not stay sorted. New icons will often overlap others. Deleted icons will leave empty spaces on the desktop. There is an option to align icons to a grid, but the grid is smaller than the icons, so icons still overlap.

[Bug #22007: no 'Settings' button in gnome-screensaver](https://bugs.launchpad.net/ubuntu/+source/gnome-screensaver/+bug/22007) (2005)  
Upstream: [Bug 316654 - no ability to configure the different screensavers](https://bugzilla.gnome.org/show_bug.cgi?id=316654)  

Have you ever wanted to change the text of GLText? It used to be as easy as selecting that screensaver and clicking on the settings button. Now there is no way to change screensaver settings short of manually editing some obscure XML files. The comment by the gnome-screensaver developer is particularly infuriating: _Resolution: WONTFIX I don't have any plans to support this. My view is that any screensaver theme that requires configuration is inherently broken._ 

[Bug #10550: DVDs with restrictive permissions are unreadable for normal user](https://bugs.launchpad.net/ubuntu/+source/util-linux/+bug/10550) (late 2004)

This one is especially silly, considering a fix probably involves passing some extra params to mount. 

[Bug #16454: Sound still comes out of speakers when PCM volume is set to 0](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/16454) (2005)

What? A bug in [ALSA](http://www.alsa-project.org/main/index.php/Main_Page)? What a surprise! I think all ALSA and PulseAudio developers are deaf, because they certainly haven't heard users screaming about Linux sound issues for the past _decade_.

[Bug #18666: Lots of seemingly redundant fonts](https://bugs.launchpad.net/ubuntu/+bug/18666) (2005)

\*sigh\*

What do these issues have in common? All of them are old, so chances are good they'll stick around in future Ubuntu releases. A decent portion of them are caused by Gnome upstream. Most are rationalized as not worth fixing because they are rarely encountered by typical users. Another common excuse is that each annoyance is minor. But an OS with a lot of small annoyances makes for a _terrible_ user experience. The chances of a user getting annoyed in a given time period are much higher in Ubuntu than in an OS with a few huge bugs. Lots of little bugs make expectation management impossible. New users can't learn about all the annoyances before they try the product. If there were only a couple of large deficiencies, users could learn about them beforehand and decide not to use the product. At the very least, their expectations of the product would be closer to reality, and the short list of deficiencies would be easier to remember and work around. 

I've been bit by every single bug I've mentioned. But those are only the oldest, most common annoyances. I'm not including newer stuff like Nvidia drivers breaking in 10.04, or static in the right channel of my headphone jack after upgrading to 10.04, or having to screw with fstab, xorg.conf, and [building my own .deb files](https://bugs.launchpad.net/ubuntu/+source/atk1.0/+bug/547244) just to get my system to boot again.

There's a reason Ubuntu is free: Nobody in their right mind would pay money for it.
