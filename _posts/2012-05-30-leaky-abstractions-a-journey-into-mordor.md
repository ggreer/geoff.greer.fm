---
date: '2012-05-30 21:40:38'
layout: post
slug: leaky-abstractions-a-journey-into-mordor
title: 'Leaky Abstractions: A Journey into Mordor'
status: publish
published: true
categories:
- Computers
---

Since I got back [from vacation](/2012/03/19/japan-trip/), I've been writing JavaScript. Node.js to be specific. Not long after I started, I found myself on a journey into Mordor.

I'll start at the beginning. [Gutsy](https://github.com/racker/gutsy) is an open-source dashboard written in Node.js. It's useful for showing all kinds of development and operations stuff in one place. You can see points of contact for each project, on-call rotations, issue stats, and other handy stuff. It even has a high score page (where everything's made up and the points don't matter). I started working on it in early April, learning Node.js along the way. Fast-forward a couple weeks. [Felix](http://www.felixsargent.com/) wanted to merge a pull request, but tests were failing in his branch. This was confusing, because the failing tests didn't seem to be related to the code he changed. Gutsy uses the [Whiskey](https://github.com/cloudkick/whiskey) test runner, so I tried out Whiskey's debugger: 

{% highlight text %}
ggreer@carbon:~/cloudkick/gutsy% whiskey --test-init-file lib/init_tests.js --debug --tests tests/api_test.js
/Users/ggreer/cloudkick/gutsy/tests/api_test.js
debug> break in #<Object>.[anonymous](exports=#<Object>, require=function require(path) {
    return self.require(path);
  }, module=#<Module>, __filename=/Users/ggreer/cloudkick/gutsy/tests/api_test.js, __dirname=/Users/ggreer/cloudkick/gutsy/tests), /Users/ggreer/cloudkick/gutsy/tests/api_test.js:2
debugger;
^
debug> bt
Cannot read property 'length' of undefined
TypeError: Cannot read property 'length' of undefined
    at /Users/ggreer/cloudkick/gutsy/node_modules/whiskey/lib/extern/_debugger.js:500:37
    at /Users/ggreer/cloudkick/gutsy/node_modules/whiskey/lib/extern/_debugger.js:352:13
    at Client._onResponse (/Users/ggreer/cloudkick/gutsy/node_modules/whiskey/lib/extern/_debugger.js:226:5)
    at Protocol.onResponse (native)
    at Protocol.execute (/Users/ggreer/cloudkick/gutsy/node_modules/whiskey/lib/extern/_debugger.js:116:14)
    at Client.<anonymous> (/Users/ggreer/cloudkick/gutsy/node_modules/whiskey/lib/extern/_debugger.js:154:14)
    at Client.emit (events.js:67:17)
    at TCP.onread (net.js:362:31)
ggreer@carbon:~/cloudkick/gutsy%
{% endhighlight %}

It crashed. I tried some other commands besides backtrace. No dice. Apparently nobody uses this feature of Whiskey.

Now I had two problems.

I took a look at Whiskey's [\_debugger.js](https://github.com/cloudkick/whiskey/blob/master/lib/extern/_debugger.js). The fact that it was in extern should have tipped me off, but once I opened the file I knew: it was a modified version of [\_debugger.js from Node.js 0.4](https://github.com/joyent/node/blob/82cfdb88facd946926a40822b6939737e0ebddc4/lib/_debugger.js). The debugger changed quite a bit in 0.6, so it makes sense that Whiskey broke.

At that point I decided to fix Whiskey's debug option. Instead of copy-pasting Node's new debugger client, I figured it would be better to do things the right way. Whiskey runs tests in a child process, so my plan was to append `debug` to the arguments sent to `child_process.spawn()`. After that, I'd just need to hook up stdin, stdout, and stderr, and handle signals appropriately.

It didn't take me long to get things mostly-working, but I was stymied by one show-stopper: Hitting ctrl+c in the debugger repl killed the child process instead of exiting the repl. After toying around with [kill.d](http://www.brendangregg.com/DTrace/kill.d), I saw that `node debug` was sending `SIGINT` to the child. The child was paused, so it would die even if it had a signal handler. Basically, `node debug` was forwarding signals that it shouldn't.

Now I had three problems.

I built a simple failure case and created [an issue](https://github.com/joyent/node/issues/3167). [Ben Noordhuis](https://github.com/bnoordhuis) looked into it, and found that part of the reason for Node's behavior was [a bug in V8](http://code.google.com/p/v8/issues/detail?id=2098)!

To summarize: I went from a bug in a program, to a bug in the test suite for that program, to a bug in Node.js, which was caused by a bug in [V8](http://code.google.com/p/v8/). Talk about your leaky abstractions!

As [Douglas Crockford](http://www.crockford.com/) [says](http://www.youtube.com/watch?v=taaEzHI9xyY#t=26m50s):

>I think there has to be something seriously wrong with you in order to do this work. A normal person, once they've looked into the abyss, will say, \"I'm done. This is stupid. I'm going to do something else.\" But not us, 'cause there's something really wrong with us.

I'm surprised I haven't gone insane from dealing with these sorts of bugs. OK, I'll admit I'm a little wacky. I'm surprised I haven't gone *more* insane.
