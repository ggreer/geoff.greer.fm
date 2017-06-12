---
date: '2017-06-16 19:49:46'
layout: post
slug: gnome-terminal-antialiasing-saga
published: true
title: "GNOME Terminal Antialiasing Saga"
categories:
- Computers
---

[Previously]({% post_url 2016-08-26-gnome-terminal-cursor-blinking-saga %}).

On lower-DPI displays, [I prefer to use bitmap fonts]({% post_url 2013-12-24-programming-fonts %}) for fixed-width stuff like terminals and text editors. As the title foreshadows, Gnome did not agree with my preference.

Despite the bitmap font, Gnome terminal was applying [antialiasing](https://en.wikipedia.org/wiki/Font_rasterization) and [subpixel hinting](https://en.wikipedia.org/wiki/Subpixel_rendering). This made text appear blurry:

<img alt="Gnome terminal making stuff blurry" src="/images/Screenshot from 2017-06-11 16-53-20.png" style="width: 465px; height: 305px;" />

<img alt="enlargement of obvious antialiasing" src="/images/Screenshot from 2017-06-11 16-53-20-crop.png" style="width: 450px; height: 180px;" />

Other platforms have terminal emulators that make this an easy fix. Both Terminal.app and PuTTY have checkboxes to disable antialiasing and subpixel hinting. As one would expect of Gnome, there's no GUI config for this option.

To solve this problem, I delved into [fontconfig](https://www.freedesktop.org/software/fontconfig/fontconfig-user.html). My goal was to disable antialiasing for just one font. I created a `~/.fonts.conf`:

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



http://i.imgur.com/SoSBkc9.png (putty)


no way to tell terminal, so... other options
fontconfig

fonts.conf
wrong path (~/.fonts.conf is deprecated. use ~/.config/fontconfig/fonts.conf)
still not working

read docs, found out about FC_DEBUG
do binary arithmetic to figure out debug options
tried various options. usually printed out 

ggreer@zinc:~% FC_DEBUG=35 fc-match -v ProggyTinyTTSZ family antialias hinting file | wc -l
29771

30k lines of logs... wtf

eventually settled on FC_DEBUG=4
only 5k lines of logs

looks like some settings are being overridden or something? unclear (grab logs here?)

ls /etc/fonts/conf.d
50-user
user stuff loaded in the middle of font config, not at the end
other stuff might be overriding my settings

stared at my xml file more and compared against docs

had <match target="pattern"> instead of <match target="font">

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

finally!

<img alt="Gnome terminal with correctly rendered fonts" src="/images/Screenshot from 2017-06-11 12-22-58.png" style="width: 465px; height: 305px;" />

in case it wasn't obvious already, gnome is absurdly hard to use
