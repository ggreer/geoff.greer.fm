---
date: '2017-06-16 19:49:46'
layout: post
slug: gnome-terminal-antialiasing-saga
published: true
title: "GNOME Terminal Antialiasing Saga"
categories:
- Computers
---

[Previously]({% post_url 2016-08-26-gnome-terminal-cursor-blinking-saga %})

on non-retina displays, I use bitmap fonts for fixed-width stuff (proggy fonts)
gnome terminal was aliasing (screenshot)
macos terminal & putty both have checkboxes to disable antialiasing & subpixel hinting
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

```xml
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
```

finally!

screenshot?

in case it wasn't obvious already, gnome is absurdly hard to use
