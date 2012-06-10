---
date: '2006-08-01 12:09:47'
layout: post
slug: lscolorsexfxcxdxbxegedabagacad
status: publish
title: LSCOLORS=ExFxCxDxBxegedabagacad
wordpress_id: '16'
categories:
- Computers
---

By default OS X Terminal doesn't have colored output enabled for ls. Some people love colors in ls (me), others hate them. I like them, but the default colors aren't very useful. Directories are blue, meaning they blend in very well with a black terminal background. It's even worse if you're using a blue background (such as the default Aqua background) and a translucent terminal. OS X uses a different format for its LSCOLORS environment variable than Linux, so it's hard to figure out how to change the default colors and googling doesn't help much. I threw together a JavaScript LSCOLORS generator as an exercise. It probably works on most modern browsers (I've tested it in Safari and IE 7) but I make no guarantees. I included a preview of what the colors will look like in a terminal. The colors aren't perfect, but it's not bad for toying around. Also, a note about why I have a bold checkbox for background colors: bolding the background causes the color to be lighter (bold brown is yellow in most terminals). This is not reflected in the preview, mostly because I don't know all the quirks about bold backgrounds.


If I'm particularly interested, I might add Linux LS_COLORS to this also. The options are much more complicated (colors for any file extension, blinking, underlining, and other formatting options) so it would probably take me longer.


Oh yeah, here's a [link](/lscolors/) to the thing.
