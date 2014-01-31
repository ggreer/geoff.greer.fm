---
layout: page
title: The Silver Searcher
releases:
- 0.19.2
- 0.19.1
- 0.18.1
- 0.18
- 0.17
---

The Silver Searcher is a tool for searching code. See [the GitHub page](https://github.com/ggreer/the_silver_searcher) for more info.

Release tarballs are signed with [my public key](/ggreer_gpg_key.asc) (3F0A04B6). To verify a release, first download my public key and import it:

    gpg --import ggreer_gpg_key.asc

After downloading the tarball and signature, run:

    gpg --verify the_silver_searcher-{{ page.releases|first }}.tar.gz.asc \
                 the_silver_searcher-{{ page.releases|first }}.tar.gz
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
