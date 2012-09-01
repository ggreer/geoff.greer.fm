---
date: '2008-06-27 19:41:55'
layout: post
slug: lscolorsls_colors-now-with-linux-support
status: publish
title: 'LSCOLORS/LS_COLORS: Now with Linux Support'
wordpress_id: '58'
categories:
- Computers
- ls_colors
---

A while back I made a [little web page to spruce up `ls` output](/2006/08/01/lscolorsexfxcxdxbxegedabagacad/). Of course I completely forgot about it until recently. Some of Ubuntu's default colors were hard to see in Terminal.app, so I added mostly-working `LS_COLORS` for Linux. The string format is completely different, and harder to go from text to preview, so I ditched that feature. Linux people will have to copy-paste the color string and type `ls` in their terminals. Life's tough, I know. 

Anyway, [try it out](/lscolors/).

Once you've got a theme you like, try the following for BSD/OS X:

{% highlight bash %}
LSCOLORS="exfxcxdxbxegedabagacad"
export LSCOLORS
alias ls="ls -G"
{% endhighlight %}

or on Linux:

{% highlight bash %}
LS_COLORS="di=34;40:ln=35;40:so=32;40:pi=33;40:ex=31;40:bd=34;46:cd=34;43:su=0;41:sg=0;46:tw=0;42:ow=0;43:"
export LS_COLORS
alias ls="ls --color"
{% endhighlight %}

Apparently just setting an environment variable called `LS_COLORS` doesn't mean you actually want ls to print in color. You have to set up the aliases as well. Add the lines above to `~/.bash_profile` (or `.profile` if you're a ksh user) to make the change permanent.

One thing I learned: Linux's color string is much more powerful than BSD's. Linux's `ls` lets you choose more colors, blinking text, and backwards text. It even lets you specify color settings for specific file extensions in addition to general types of files. Support for all those extra features will have to wait until forever. I use color information sparingly. Too many colors is just as useless as no color. If you want to get fancy, [this guy](http://linux-sxs.org/housekeeping/lscolors.html) has some helpful info. 
