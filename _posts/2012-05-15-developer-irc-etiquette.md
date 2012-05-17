---
date: '2012-05-14 22:18:03'
layout: post
slug: developer-irc-etiquette
status: draft
title: A Primer on Developer IRC Etiquette
categories:
- Computers
---

[IRC](http://en.wikipedia.org/wiki/Internet_Relay_Chat) is a great way to get hands-on help when learning a new language or framework. The experts in tech-related IRC channels are amazing. Their hourly consulting rates are insane, but they give advice freely on IRC and mailing lists. That said, it's important to note that IRC veterans find some common newbie behaviors very annoying. Getting help from these experts can be tricky for a newbie, but the rewards are great.

To help newbies out, here is a short list of guidelines:

1. Before asking for help on IRC, use Google and [read the docs](http://en.wikipedia.org/wiki/RTFM). People will get annoyed if you ask questions that are answered in documentation. It shows you didn't try very hard to find the answer before wasting their time.
2. Don't ask to ask, just ask.
3. Explain the problem as well as you can. Mention what you think should happen and what is actually happening. Be specific. Saying, "It doesn't work." will earn you the ire of everyone in the channel. How doesn't it work? What error messages do you see? What do the logs say? People need to know the answers to these questions so they can help.
4. [Gist](https://gist.github.com/) any error logs or source code you have a problem with. Pasting large chunks of text in IRC is frowned upon. It's called flooding, and it makes conversation difficult for others. Some channels will kick you for flooding. If your IRC client doesn't rate-limit, the server can even disconnect you.
5. Explain what you're trying to do. Often there's an easier way to get what you want out of a language or framework. Others might know of a useful module or library that does much of the heavy lifting for you. 
6. Finally, [don't be a dick](http://meta.wikimedia.org/wiki/Don%27t_be_a_dick). Don't call a project stupid. Every piece of software has stupid parts. Granted, some have more stupidity than others, but name-calling isn't going to help fix the problems. More importantly, name-calling won't get you help. It will probably just get you kick-banned.

Following these rules will make life much more pleasant for everyone involved. You'll be more likely to get your problem solved and the channel regulars will have less stress in their lives. 

I was motivated to write this after an inexperienced person joined #node.js on Freenode. I failed to find a similar rule list that I read years before. I thought about linking to ESR's [How to Ask Questions the Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html), but it's too general, too long, and insults the reader. Now that I've written this, I'll be ready next time.