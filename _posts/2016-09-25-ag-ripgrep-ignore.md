---
date: '2016-09-26 14:12:57'
layout: post
slug: ignore
published: true
title: 'Ag & Ripgrep: .ignore'
categories:
- Computers
- the_silver_searcher
---

A few days ago, [Andrew Gallant](http://burntsushi.net/) (AKA BurntSushi) released [ripgrep](https://github.com/BurntSushi/ripgrep), a search tool similar to to [ag](/ag). To coincide with the initial release, Gallant wrote [a blog post comparing various search tools](http://blog.burntsushi.net/ripgrep/). In it, he discusses both the advantages and shortcomings of a half-dozen tools, including ag. He finds bugs, cases of pathological performance, and unexpected ways in which these tools can be sped-up. If the topic even remotely interests you, read Gallant's blog post.

Gallant's post [was discussed on Hacker News](https://news.ycombinator.com/item?id=12564442). I [replied](https://news.ycombinator.com/item?id=12567328) with my thoughts, which spurred a pleasant and productive discussion with Andrew. I noticed that both of our tools had ignore files (`.agignore` and `.rgignore`), so [I suggested we converge on a common name and format](https://news.ycombinator.com/item?id=12568245). We quickly agreed on `.ignore` (surprisingly, it wasn't taken). Within a couple hours, both of us had added the feature into our respective projects.[^ag][^rg] The author of [sift](https://github.com/svent/sift/) also [seems to be on board](https://github.com/svent/sift/issues/78#issuecomment-249335277).

The new .ignore file is supported in ag v0.33.0.

### What 



---

[^ag]: https://github.com/ggreer/the_silver_searcher/pull/974

[^rg]: https://github.com/BurntSushi/ripgrep/pull/41
