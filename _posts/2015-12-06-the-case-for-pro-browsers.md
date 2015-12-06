---
date: '2015-12-06 10:46:45'
layout: post
slug: the-case-for-pro-browsers
published: true
title: 'The Case for "Pro" Browsers'
categories:
- Computers
---

Over the past few years, I've gradually become more frustrated with web browsers. Don't get me wrong. Today's browsers are faster, more stable, and more secure than ever. They have better debugging tools. They support more interesting technologies like [HTML5](https://en.wikipedia.org/wiki/HTML5) and [WebRTC](https://en.wikipedia.org/wiki/WebRTC). In almost every measurable way, browsers are strictly better than they used to be.

Except one: User interfaces.

Originally, browsers were created by developers for developers. But lately, Chrome and Firefox have focused on improving the experience for normal users. This is, on net, a good thing. The vast majority of users benefit from features like [voice search](https://support.google.com/websearch/answer/2940021?hl=en), [profile synchronization](https://support.google.com/chrome/answer/165139?hl=en), [apps](https://chrome.google.com/webstore/category/apps), and fancy new tab pages. They also benefit from dangerous settings being hidden in places like `chrome://flags`.

But not me. When running a browser for the first time, I disable a dozen features and install extensions to expose advanced behavior. I change my search engine so the Google Doodle doesn't show up on Chrome's new tab page. I add an extension to [restore Chrome's presentation mode](https://github.com/lgarron/presentation-mode). 

Still, I can't fix every annoyance. The new tab page lacks recently-closed tabs. The developer console [requires some priming before pasting will work](https://code.google.com/p/chromium/issues/detail?id=345205#c21
). Pasting `javascript:` URLs in the address bar [doesn't work](https://code.google.com/p/chromium/issues/detail?id=85232). Some TLS certificate errors can't be overridden. These aren't just UI annoyances. Some of these changes really have hurt developer productivity. And yet, I can't fault Chrome for making these changes. They're great for the vast majority of users.

One browser can't satisfy both consumers and developers. So what's the solution? Simple: Have more than one browser. Differentiate. Use the same libraries and rendering engines, just tweak the UI to be more developer-friendly.
