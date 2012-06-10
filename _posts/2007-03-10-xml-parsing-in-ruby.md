---
date: '2007-03-10 16:26:56'
layout: post
slug: xml-parsing-in-ruby
status: publish
title: XML Parsing in Ruby
wordpress_id: '11'
categories:
- Computers
---

I've recently started learning Ruby (and Rails) after seeing a coworker use RoR to quickly throw together a web app with all the goodies: AJAX, MySQL backend, pretty Web 2.0 theme, etc. I've gotten rather tired of Nike's flash-based web app for their [iPod sport kit](http://www.apple.com/ipod/nike/), so I decided parsing the [XML files](http://blog.mattmecham.com/archives/2006/09/ipod_training_data_under_the_h_1.html) on my iPod Nano would be good Ruby practice and familiarize me with Nike's XML. I threw together a quick script that parses the Nike+iPod data and prints it out. You can get it [here](/code/nike_xml/nike_xml_parse.rb). If you're too lazy to copy one of the XML files off your iPod (or too lazy to run, or too poor/nonconformist to buy an iPod, etc), I've also got a [test file](/code/nike_xml/2006-12-15%2015%3b12%3b28.xml). I haven't tried XML parsing in too many other languages, but Ruby makes it pretty easy. Iterating over a bunch of the same kind of elements is very handy. I'm working on turning this into a full web app that lets you upload XML files and track your runs (basically a version of [Nike's website](http://www.nike.com/nikeplus/) without the suck), but I don't think it's ready yet. When I get it closer to  done  I'll make the SVN repo public and set up a production copy.
