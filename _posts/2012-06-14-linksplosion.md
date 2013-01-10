---
date: '2012-06-14 08:27:52'
layout: post
slug: linksplosion
title: 'Linksplosion'
published: true
categories:
- Computers
- JavaScript
---

After coming home from work this evening, I sat down and wrote a little browser extension. 4 hours later, it was done.[\[1\]](#ref_1) Behold: [Linksplosion](https://chrome.google.com/webstore/detail/kobgjacjhaakkgpakjkocgoemmcgcjkj). Simply select some content, right-click, and click on "Open all links in selection." Bam! You'll be treated to a cornucopia of new tabs.

![](/images/linksplosion_screenshot.png)

If you don't want to [install the extension](https://chrome.google.com/webstore/detail/kobgjacjhaakkgpakjkocgoemmcgcjkj) from the Chrome store, you can grab the source on [GitHub](https://github.com/ggreer/linksplosion). Like pretty much everything else I write in my spare time, the license is Apache 2.0.

You might be asking, "Why make this thing?"

I knew this feature already existed in other extensions, but I wanted something less bloated. Also, I wanted to get more experience writing Chrome extensions. I succeeded on both fronts. I learned useful things such as [Chrome's context menu API](http://code.google.com/chrome/extensions/contextMenus.html) and discovered the particularly handy [Element.querySelectorAll](https://developer.mozilla.org/en/DOM/Element.querySelectorAll).[\[2\]](#ref_2) Originally, I had a recursive function that walked the DOM looking for anchor tags. I knew it was bad, but couldn't think of anything better.

I've been tinkering with Chrome extensions for a while now, and I think there's a lot of low-hanging fruit for anyone who knows some JavaScript. Chrome's extension APIs are pretty easy to pick up. Considering how much time developers spend using browsers, writing more custom extensions is probably worthwhile.

---
<a name="ref_1"> </a>
1. A significant portion of the time wasn't even coding. Finding an appropriate icon and submitting the extension to the Chrome Web Store took at least an hour.

<a name="ref_2"> </a>
2. Thanks to [Bjorn](http://bjorn.tipling.com/) for telling me about querySelectorAll.