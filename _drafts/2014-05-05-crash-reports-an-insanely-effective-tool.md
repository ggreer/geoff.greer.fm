---
date: '2014-05-05 20:13:47'
layout: post
slug: crash-reports-an-insanely-effective-tool
published: false
title: 'Crash Reports: An Insanely Effective Tool'
categories:
  - Computers
---

When discussing how to improve the quality of software, many topics are covered: unit tests, integration tests, static analysis, QA, and more. But one important and oft-underused tool is crash reporting. 

Crash reporting isn't just for native apps. Every modern browser (yes even IE) supports `window.onerror`.

{% highlight javascript %}
window.onerror = function (message, path, line, column) {
  
}
{% endhighlight %}

https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
