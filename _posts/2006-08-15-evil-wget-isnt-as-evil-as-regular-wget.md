---
date: '2006-08-15 11:24:03'
layout: post
slug: evil-wget-isnt-as-evil-as-regular-wget
status: publish
title: Evil wget isn't as evil as regular wget
wordpress_id: '15'
categories:
- Computers
---

Compiling wget for Windows is not a difficult task, but there is almost no good documentation out there to help. [This guy](http://www.christopherlewis.com/WGet/WgetOnWindows.htm) has a decent guide. I use Visual Studio 2005, but Microsoft gives away a [free version](http://msdn.microsoft.com/vstudio/express/visualc/) that will work just as well for this purpose. Wget depends on openssl (to connect to secure http servers) and openssl requires perl to build. You can skip the whole installing ActivePerl step and grab a [pre-compiled version](http://www.christopherlewis.com/WGet/WgetOnWindows.htm). (You'll want to get the zipped precompiled copy of OpenSSL linked to on that page.)


After figuring this out, I compiled evil wget for [Windows](/code/evil_wget/binaries/windows/). You'll need the OpenSSL DLLs in the same directory. Also, evil wget is improved. Now it fakes its User Agent to pretend to be IE 6. This means that clever admins who block by user agent are out of luck. Blocking by IP is always an option though. Source is [here](/code/evil_wget/). There are also binaries for [OS X](/code/evil_wget/binaries/os%20x/) and [Linux](/code/evil_wget/binaries/linux/). Both depend on OpenSSL.


By the way, anyone using wget to retrieve files from a web server with password authentication should be careful. Wget tries using basic authentication, then digest auth if that fails. Even if your web server is properly configured to use digest authentication, wget will send your password out base64 encoded first. Most sniffers will recognize the string is base64 encoded and automatically decode the username and password. Think first before telling wget to use authentication as your credentials will be sent out for anyone to sniff. Use something like curl (http://curl.haxx.se/) instead.
