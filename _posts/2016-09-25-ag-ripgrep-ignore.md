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

A few days ago, [Andrew Gallant](http://burntsushi.net/) (AKA BurntSushi) released [ripgrep](https://github.com/BurntSushi/ripgrep), a search tool similar to to [ag](/ag). To coincide with the initial release, Gallant wrote [a blog post comparing various search tools](http://blog.burntsushi.net/ripgrep/). In it, he discusses both the advantages and shortcomings of a half-dozen tools, including ag. He finds bugs, pathological performance cases, and unexpected ways in which these tools can be sped-up. If the topic even remotely interests you, read Gallant's blog post.

When Gallant's post [was discussed on Hacker News](https://news.ycombinator.com/item?id=12564442), I [replied](https://news.ycombinator.com/item?id=12567328) with my thoughts. This spurred a pleasant and productive discussion. I noticed that both of our tools had ignore files (`.agignore` and `.rgignore`), so [I suggested we converge on a common name and format](https://news.ycombinator.com/item?id=12568245). We quickly agreed on `.ignore` (surprisingly, it wasn't taken). Within a couple of hours, both of us had added the feature into our respective projects.[^ag][^rg] The author of [sift](https://github.com/svent/sift/) also [seems to be on board](https://github.com/svent/sift/issues/78#issuecomment-249335277).

Support for `.ignore` files is in ag v0.33.0 and later. If you have `.agignore` files, don't worry. You'll have plenty of time to rename them. It will be at least six months before I deprecate them, and probably a year before they're no longer read.

The whole experience was positive for everyone involved. Andrew and I had an enjoyable exchange. Users of our tools were saved some trouble. And there's a decent chance that more software will support the same `.ignore` standard. I'm happy to have played a part in creating this small gem of collaboration.


---

[^ag]: [Ag pull request #974: Prefer .ignore to .agignore](https://github.com/ggreer/the_silver_searcher/pull/974)

[^rg]: [Ripgrep pull request #41: Switch from .rgignore to .ignore](https://github.com/BurntSushi/ripgrep/pull/41)
