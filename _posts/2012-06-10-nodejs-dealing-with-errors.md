---
date: '2012-06-10 03:06:41'
layout: post
slug: nodejs-dealing-with-errors
title: 'Node.js: Dealing with Errors'
published: true
categories:
- Computers
- Node.js
---

I've been working with [Node.js](http://nodejs.org/) for a couple of months now, and my experience has been largely negative. By far, my biggest gripe is error handling. Handling errors in Node.js is a giant pain, because there are two incompatible ways to do it. JavaScript uses [try/throw/catch](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Examples). Node.js uses callbacks with error arguments. The impedance mismatch happens when throwing an error in a callback. Here's a concrete example:

{% highlight javascript %}
fs = require('fs');

try {
  fs.stat('doesnt_exist.txt', function(err, stats) {
    if (err) {
      throw err;
    }
    console.log('data', stats);
  });
}
catch (e) {
  console.error('error statting');
}
{% endhighlight %}

At first glance, it looks like the output will be `error statting`. Running the program shows something else:

{% highlight text %}
ggreer@carbon:~% node cb_error_example.js

/Users/ggreer/cb_error_example.js:6
      throw err;
            ^
Error: ENOENT, stat 'doesnt_exist.txt'
{% endhighlight %}

The error isn't caught. The program crashes instead. In JavaScript, catching errors doesn't work like closures. Although the structure of the code makes it look like all errors will be caught, the `throw` is in a callback which gets executed long after the rest of the code has finished running. If anything is going to catch this error, it's in `fs.stat()`.

For the most part, your programs are going crash if any callback in a chain throws an error. To prevent this, you have to get used to wrapping tons of stuff in try/catch or engaging in ludicrously defensive programming.

Before some self-proclaimed Node expert tells me to stop throwing errors in callbacks, I'll point out that the Node.js API docs contain plenty of examples. Basic stuff like [reading files](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_encoding_callback) uses this pattern. More importantly, it's easy to unintentionally throw an error. Accessing a property of an undefined variable is a common mistake, and will throw a [ReferenceError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/ReferenceError).

## Error isolation

I know people have said this before, but it's insane that Node runs its own web server. By default, a single unhandled error will cause your web server to **crash**. Here's an example:

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

To stop the web server from crashing, the typical solution is to add an uncaught exception handler:

{% highlight javascript %}
process.on('uncaughtException', function(err) {
  console.error(err.stack);
});
{% endhighlight %}

But that doesn't completely solve the problem. The user gets no useful error message, just a timeout. Also, you the programmer still have to write a bullet-proof error handler. If your code throws an error trying to log a stack trace, it's lights-out for your web server. Putting your handler code in a big try/catch can mitigate this, but that's effectively writing an error handler for your error handler. The fact that such a solution is required by Node.js is a bad [code smell](http://en.wikipedia.org/wiki/Code_smell).

Hopefully, errors will be more isolated in the future. Node.js 0.8 will introduce [domains](http://nodejs.org/docs/v0.7.9/api/domain.html), which make it easier to handle errors with more granularity. Domains seem like a good idea, but they introduce a *third* way of handling errors.

For now, Node.js forces you to reinvent the wheel. Web servers solved these problems over a decade ago, but Node's coupling between web server and application prevents you from using those solutions.
