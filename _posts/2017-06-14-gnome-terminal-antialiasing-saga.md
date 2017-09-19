---
date: '2017-06-14 19:49:46'
layout: post
slug: gnome-terminal-antialiasing-saga
published: true
title: "GNOME Terminal Antialiasing Saga"
categories:
- Computers
excerpt: "On lower-DPI displays, I like to use bitmap fonts in my terminals and text editors. As the title foreshadows, Gnome was hostile to my preference."
---

[Previously]({% post_url 2016-08-26-gnome-terminal-cursor-blinking-saga %}).

On lower-DPI displays, [I like to use bitmap fonts]({% post_url 2013-12-24-programming-fonts %}) in my terminals and text editors. I was surprised to see that Gnome Terminal still [antialiased](https://en.wikipedia.org/wiki/Font_rasterization) and [hinted](https://en.wikipedia.org/wiki/Subpixel_rendering) my bitmap font:

<div style="text-align: center;">
	<img alt="Gnome terminal making stuff blurry" src="/images/Screenshot from 2017-06-11 20-04-00.png" style="width: 471px; height: 239px;" />
</div>

Here's a close-up:

<div style="text-align: center;">
	<img alt="Enlargement of antialiasing" src="/images/Screenshot from 2017-06-11 20-04-00-crop.png" style="width: 450px; height: 135px; image-rendering: pixelated;" />
</div>

The red text is obvious, but you can also see tinges of blue and red on the white text. Not pretty.

Other platforms make it easy to get the desired behavior. Both Terminal.app and PuTTY have checkboxes to disable antialiasing and subpixel hinting. But (as anyone familiar with Gnome would expect) Gnome Terminal has no GUI setting to change this.

To solve the problem, I delved into [fontconfig](https://www.freedesktop.org/software/fontconfig/fontconfig-user.html). My goal was to disable antialiasing for just one font. I created `~/.fonts.conf` and filled it with some guesses based on docs and related Stack Overflow answers:

{% highlight xml %}
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'fonts.dtd'>
<fontconfig>
  <match target="pattern">
    <test name="family">
      <string>ProggyTinyTTSZ</string>
    </test>
    <edit mode="assign" name="antialias">
      <bool>false</bool>
    </edit>
    <edit mode="assign" name="hinting">
     <bool>false</bool>
    </edit>
  </match>
</fontconfig>
{% endhighlight %}

This had no effect. I re-read some fontconfig docs and noticed that `~/.fonts.conf` had been deprecated for a new config path: `~/.config/fontconfig/fonts.conf`. I moved the config file. Still no change.

After reading *more* fontconfig docs, I found out about `FC_DEBUG`:

> To help diagnose font and applications problems, fontconfig is built with a large amount of internal debugging left enabled. It is controlled by means of the FC_DEBUG environment variable.

Surely, debug logging would give me some clues. Naturally, this variable wasn't just a boolean:

> The value of this variable is interpreted as a number, and each bit within that value controls different debugging messages.

I tried setting `FC_DEBUG` to 35 (0b0100011), corresponding to verbose info for caching & matching. It turns out that verbose logging lives up to its name:

```
ggreer@zinc:~% FC_DEBUG=35 fc-match -v ProggyTinyTTSZ family antialias hinting file | wc -l
29771
```

That's right: almost 30,000 lines of debug logs— almost as useless as no logs. I played with other values, eventually settling on `FC_DEBUG=4`. That generated "only" 5,000 lines and seemed to contain some useful clues.

The first thing I noticed when scouring the debug logs was that many settings were being processed after my user config. I traced this down to the order of config files in `/etc/fonts/conf.d/`. The rule to load user configs was in the middle, not at the last thing done. To ensure no global config was overriding my directives, I ran `sudo mv 50-user.conf 99-user.conf`. Debug logs then confirmed that my rules were run last.

Still, I saw blurry text.

At this point, I'd been at it for almost two hours. I was getting pretty frustrated. With nothing better coming to mind, I stared at my XML. I tediously compared it against examples in the fontconfig docs. I saw one suspicious line: I was using `<match target="pattern">`, while many examples used `<match target="font">`. I changed the target attribute from "pattern" to "font":

{% highlight xml %}
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'fonts.dtd'>
<fontconfig>
  <match target="font">
    <test name="family" qual="any" compare="eq">
      <string>ProggyTinyTTSZ</string>
    </test>
    <edit mode="assign" name="antialias">
      <bool>false</bool>
    </edit>
    <edit mode="assign" name="hinting">
     <bool>false</bool>
    </edit>
  </match>
</fontconfig>
{% endhighlight %}

…and was at last rewarded with pixel-perfect text:

<div style="text-align: center;">
	<img alt="Gnome terminal with correctly rendered fonts" src="/images/Screenshot from 2017-06-11 20-02-44.png" style="width: 471px; height: 239px;" />
</div>

A close-up:

<div style="text-align: center;">
	<img alt="Enlargement of no antialiasing" src="/images/Screenshot from 2017-06-11 20-02-44-crop.png" style="width: 450px; height: 135px; image-rendering: pixelated;" />
</div>

Finally!

This is yet more evidence of how ridiculously hostile Gnome is to users. I'm no novice, but it took me two hours to accomplish what takes two seconds on every other platform. What a waste.
