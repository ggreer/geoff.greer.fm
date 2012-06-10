---
date: '2012-06-09 23:19:40'
layout: post
slug: nodejs-dealing-with-errors
title: 'Node.js: Dealing with Errors'
published: true
categories:
- Computers
- Node.js
---

I've been working with Node.js for a couple of months now, and my experience has been largely negative. By far, my biggest gripe is error handling. Handling errors in Node.js is a giant pain, because there are two incompatible ways to do it. JavaScript uses try/throw/catch. Node.js uses callbacks with error arguments. The problem is that a single uncaught error results in the callback will never getting called. Here's a concrete example:

{% highlight text %}

{% endhighlight %}

## Error isolation

I know people have said this before, but it's insane that node runs its own web server. By default, a single unhandled error will cause your web server to **crash**. Here's an example:

{% highlight javascript %}
var http = require('http');

http.createServer(function (req, res) {
  var result = decodeURIComponent(req.url);
  // chop off / at the beginning
  result = result.slice(1);
  result = result.toUpperCase(); // SHOUT

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(result + '\n');
}).listen(5000, '127.0.0.1');
{% endhighlight %}

This web server capitalizes whatever you send to it. Like so:

{% highlight text %}
ggreer@carbon:~% curl '127.0.0.1:5000/hello%20there'
HELLO THERE
{% endhighlight %}

Neat, eh? Well let's try throwing some more complicated data at it:

{% highlight text %}
ggreer@carbon:~% curl '127.0.0.1:5000/give%20110%!'
curl: (52) Empty reply from server
{% endhighlight %}

What's this?! Going back to the other terminal, I see that Node.js has crashed:

{% highlight text %}
ggreer@carbon:~% node error_example.js
/Users/ggreer/error_example.js:4
  var result = decodeURIComponent(req.url);
               ^
URIError: URI malformed
    at Server.<anonymous> (/Users/ggreer/error_example.js:4:16)
    at Server.emit (events.js:70:17)
    at HTTPParser.onIncoming (http.js:1514:12)
    at HTTPParser.onHeadersComplete (http.js:102:31)
    at Socket.ondata (http.js:1410:22)
    at TCP.onread (net.js:374:27)
ggreer@carbon:~%
{% endhighlight %}

That sucks, now what can we do about it?

## Solutions

To stop the web server from crashing, you need to add uncaught exception handler:

{% highlight javascript %}
process.on('uncaughtException', function(err) {
  console.error(err.stack);
});
{% endhighlight %}

But that doesn't completely solve the problem. The user gets no useful error message, just a timeout. Also, you still have to write a bullet-proof error handler. If you throw an error trying to log a stack trace, it's lights-out for your web server. This can mostly be mitigated by putting everything in a big try/catch, but that's effectively writing an error handler for your error handler. 

Hopefully, errors will be more isolated in the future. Node.js 0.8 will introduce [domains](http://nodejs.org/docs/v0.7.9/api/domain.html). These allow you to restrict errors to 

But for now, you're screwed. This kind of coupling is insane. Web servers solved these problems decades ago. Node.js forces you to reinvent the wheel.
