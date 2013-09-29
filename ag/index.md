---
layout: page
title: The Silver Searcher
releases:
- 0.17
---

[The Silver Searcher](https://github.com/ggreer/the_silver_searcher) is a tool for searching code.


<br />

## Releases

{% for release in page.releases %}
* [`the_silver_searcher-{{ release }}.tar.gz`](releases/the_silver_searcher-{{ release }}.tar.gz) <span class="gpg_sig">[`GPG signature`](releases/the_silver_searcher-{{ release }}.tar.gz.asc)</span>
{% endfor %}

<br />

## Related posts
{% for post in site.categories.the_silver_searcher %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}
