---
date: '2012-06-09 14:15:04'
layout: post
slug: nodejs-complaints
title: 'Node.js Complaints'
published: true
categories:
- Computers
---

I've been working with Node.js for a couple of months now, and my experience has been largely negative. Node.js has a lot of problems. Worse, it doesn't seem to solve many 

By far, my biggest gripe is error handling. JavaScript uses try/throw/catch. Node.js uses callbacks with error arguments. But a single uncaught error means the callback will never be called. Here's a concrete example:

{% highlight text %}
blah
{% endhighlight %}

javascript
throws errors
node.js
uses callbacks/errbacks
Hopefully will be fixed in the future: http://nodejs.org/docs/v0.7.9/api/domain.html
but for now, you're screwed


## Node modules

Node modules are of varying quality. Some are pretty solid. Some aren't. It's not easy to tell which is which until you start using one. Popular modules such as node-sqlite3 have significant issues.

npm module stability
    sqlite3 module. trace doesn't always print the sql executed
    useless error messages
http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate

npm install broke sqlite3.
sqlite3 suddenly depended on node-gyp. there was a build error but npm install kept on truckin'

Reload a module.

## Error Isolation

I know people have said this before, but it's insane that node runs its own web server. Specialized web servers like httpd and nginx have a ton features, and an ecosystem of tools and documentation centered around them. You lose all that with Node.js. Rate-limiting, .htaccess files, IP blocking, mod_rewrite. You have to re-implement these, or proxy all requests through a real web server.

Worst of all, by default a single unhandled error will cause your web server to **crash**. Here's an example:

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

To stop the web server from crashing, you need to add uncaught exception handler:

{% highlight javascript %}
process.on('uncaughtException', function(err) {
  console.error(err.stack);
});
{% endhighlight %}

But that doesn't completely solve the problem. The user gets no useful error message, just a timeout. Also, you still have to write a bullet-proof error handler. If you throw an error trying to log a stack trace, it's lights-out for your web server. This can mostly be mitigated by putting everything in a big try/catch, but 

This kind of coupling is insane. Web servers solved these problems decades ago. Node.js forces you to reinvent the wheel. 

Performance. 
