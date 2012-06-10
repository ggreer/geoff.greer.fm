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

Node modules are of varying quality. Some are pretty solid. Some aren't. It's not easy to tell which is which until you start using one. Popular modules such as node-sqlite3 have significant issues.

npm module stability
    sqlite3 module. trace doesn't always print the sql executed
    useless error messages
http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate

npm install broke sqlite3.
sqlite3 suddenly depended on node-gyp. there was a build error but npm install kept on truckin'

Reload a module.


Performance.


Specialized web servers like httpd and nginx have a ton features, and an ecosystem of tools and documentation centered around them. You lose all that with Node.js. Rate-limiting, .htaccess files, IP blocking, mod_rewrite. You have to re-implement these, or proxy all requests through a real web server.

Worst of all, b