---
date: '2012-06-09 23:19:40'
layout: post
slug: nodejs-modules
title: 'Node.js: Dealing with Modules'
published: true
categories:
- Computers
- Node.js
---

My other major complaint with Node is the modules, or lack of them.

The MaaS team ended up writing their own XML parser and their own test runner. The situation has gotten better since MaaS was started, but there are still gaps. Module quality is another problem. Quality varies significantly, and in my experience, bugs don't seem to get fixed. 

I have found and reported bugs in popular modules such as node-sqlite3, jade, and our home-grown whiskey. After two months, node-sqlite3 still doesn't log the most recent statement executed before an error. Jade still screws up non-breaking spaces. Whiskey's debugger still crashes. I tried fixing whiskey myself and found a bug in Node.js. It hasn't been fixed yet either, although a partially-responsible bug in V8 was fixed.

Hopefully I've made my grievances relatable. I wanted to like Node, but I don't. It's like strawberry ice cream to me: It looks good, people say good things about it, but then I sink my teeth in and regret it. That doesn't mean there's something inherently wrong with strawberry. It's just not for me.

Node modules are of varying quality. Some are pretty solid. Some aren't. It's not easy to tell which is which until you start using one. Popular modules such as node-sqlite3 have significant issues.

npm module stability
    sqlite3 module. trace doesn't always print the sql executed
    useless error messages
http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate

npm install broke sqlite3.
sqlite3 suddenly depended on node-gyp. there was a build error but npm install kept on truckin'

Reload a module.


Performance.

Worst of all, b


