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

When setting up a new computer, one of the first things I do is disable cursor blinking in the terminal. For the past decade, the Gnome team has worked diligently to make this as hard as possible.

<div style="text-align: center;">
  <img alt="On. Off. On. Off. On. Off..." src="/images/gnome_terminal_cursor_blinking.gif" />
</div>

The story begins in 2006. Back then, Gnome Terminal had a checkbox in its settings. Here's a screenshot from Ubuntu 6.06:

![GNOME Terminal Settings in Ubuntu 6.06](/images/gnome_terminal_ubuntu_6.png)

Unchecking "Cursor blinks" would stop the cursor from blinking. It was simple and accessible; exactly the kind of UI that has no place in a Gnome project. Some developers soon decided to "simplify" things by going, "…on a quest to remove all annoying tiny little bits in GNOME's UI." Instead of having a checkbox, they wanted the terminal to obey the global system setting (for cursors in text editors, browser URL bars, etc). Hence [Bug 342921 - Cursor blinking preference should follow system defaults](https://bugzilla.gnome.org/show_bug.cgi?id=342921). The checkbox was removed in Gnome v2.22, meaning that the only way to disable blinking was to turn it off in the entire Gnome UI. This annoyed many people, as a giant blinking block is far more prominent than a thin blinking line. Users quickly responded. They created issues such as [Bug 533522 - Alllow override of system blink preference](https://bugzilla.gnome.org/show_bug.cgi?id=533522) and [Bug 534207 - Something to fix the cursor blinking problem soon](https://bugzilla.gnome.org/show_bug.cgi?id=534207). Gnome was going through a UI freeze at the time, so the "fix" was to create a gconf setting. Now to disable terminal blinking, you had to run:

```
gconftool-2 --set "/apps/gnome-terminal/profiles/Default/cursor_blink" \
            --type boolean "False"
```

Good luck figuring that out on your own. Fortunately, the magic invocation was quickly documented on sites such as Stack Overflow. It even made its way to [a page dedicated to stopping cursor blinks](http://www.jurta.org/en/prog/noblink#GNOME_Terminal). Things stayed that way for five years.

Then Gnome 3 came out.

The old magic invocation no longer appeased the Gnome gods. This issue was created: [Bug 702901 - Disabling blinking cursor not working](https://bugzilla.gnome.org/show_bug.cgi?id=702901). The reason for the breakage was twofold. First: Gnome switched from gconf to dconf. Second: Gnome devs changed the config schema for terminal settings. In Gnome 2, each terminal profile was stored by name. This allowed for paths like `/profiles/Default/` to work across systems. Gnome 3 stored profiles by UUID. Since UUIDs tend to be rather *unique*, there isn't a standard default key. One first has to get the UUID of the default profile, then set the appropriate key under it. Like so:

```
% gsettings get org.gnome.Terminal.ProfilesList default
'b1dcc9dd-5262-4d8d-a863-c897e6d979b9'
% gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/ cursor-blink-mode off
%
```

To make it a one-liner, you have to use a subshell:

```
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:$(gsettings get org.gnome.Terminal.ProfilesList default | tr -d \')/ cursor-blink-mode off
```

Annoyingly, this information isn't in Gnome's answer to [How can I stop the cursor from blinking?](https://wiki.gnome.org/action/show/Apps/Terminal/FAQ?action=show&redirect=Terminal%2FFAQ#How_can_I_stop_the_cursor_from_blinking.3F). Instead, they link to another answer, which contains this gem:

> Unfortunately, the gsettings tool can't currently autocomplete the key names with relocatable schemas (that's [this bug](https://bugzilla.gnome.org/show_bug.cgi?id=704132)), but you can just [read the schema itself](https://git.gnome.org/browse/gnome-terminal/tree/src/org.gnome.Terminal.gschema.xml).

I cannot recall encountering a more user-hostile experience. How many people are going to read a *700 line XML file* to tweak their terminal? It's absurd. There are two possible explanations for such a terrible experience: Either the Gnome developers are indifferent to their users, or they are incompetent. Actually, it could be worse. It could be both.


### Conclusion

The issue to re-add the blink checkbox still exists: [Bug 559990 - Add UI for the cursor blink preference](https://bugzilla.gnome.org/show_bug.cgi?id=559990). I doubt it will be fixed any time soon. In case you were curious: OS X has a non-blinking cursor by default. Changing it requires checking a box in the settings menu:

![OS X Terminal.app settings](/images/Screen Shot 2016-08-29 at 18.35.49.png)

…just like Gnome had 10 years ago.

Desktop Linux is fraught with these sorts of issues. The only reason I use it is because I need to test software on the platform. If not for that, I doubt I'd ever touch a Linux GUI again.
