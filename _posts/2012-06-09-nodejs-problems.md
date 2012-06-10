---
date: '2012-06-03 15:21:04'
layout: post
slug: nodejs-
title: 'Node.js'
published: false
categories:
- Computers
---

Reload a module.

npm module stability
    sqlite3 module. trace doesn't always print the sql executed
    useless error messages
http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate


npm install broke sqlite3.
sqlite3 suddenly depended on node-gyp. there was a build error but npm install kept on truckin'

I know people have said this before, but it's insane that node runs its own web server. You lose a ton features that specialized web servers like apache and nginx have. worse, you lose an ecosystem of tools and documentation centered around them. no .htaccess files, no rate limiting. no ip blocking. no mod_rewrite. Worst of all, by default a single unhandled error will cause your web server to crash. Sure, everyone has `process.on('uncaughtException'...`, but that means you have to write a bullet-proof error handler. If you cause an exception trying to log a stack trace, it's lights-out for your web server. This kind of coupling is insane.


error handling
javascript
throws errors
node.js
uses callbacks/errbacks
Hopefully will be fixed in the future: http://nodejs.org/docs/v0.7.9/api/domain.html
but for now, you're screwed
