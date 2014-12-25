---
layout: page
title: The Silver Searcher
releases:
- 0.28.0
- 0.27.0
- 0.26.0
- 0.25.0
- 0.24.1
- 0.24.0
- 0.23.0
- 0.22.0
- 0.21.1
- 0.21.0
- 0.20.0
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
<div class="row">
  <div class="col w4">
    <a href="releases/the_silver_searcher-{{ release }}.tar.gz"><code>the_silver_searcher-{{ release }}.tar.gz</code></a>
  </div><div class="col w2">
    <a href="releases/the_silver_searcher-{{ release }}.tar.gz.asc"><code>GPG signature</code></a>
  </div>
</div>
{% endfor %}

<br />

## [Are we fast yet?](/ag/speed/)

{% include ag_speed.md %}

<br />

## Related posts
{% for post in site.categories.the_silver_searcher %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}
