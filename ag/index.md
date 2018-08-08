---
layout: page
title: The Silver Searcher
releases:
- 2.2.0
- 2.1.0
- 2.0.0
- 1.0.3
- 1.0.2
- 1.0.1
- 1.0.0
- 0.33.0
- 0.32.0
- 0.31.0
- 0.30.0
- 0.29.1
- 0.29.0
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

The Silver Searcher is a tool for searching code. It started off as a clone of [Ack](http://beyondgrep.com/), but their feature sets have since diverged slightly. In typical usage, Ag is 5-10x faster than Ack. See [the GitHub page](https://github.com/ggreer/the_silver_searcher) for more info.

Release tarballs are signed with [my public key](/ggreer_gpg_key.asc) (3F0A04B6). To verify a release, first download my public key and import it:

    gpg --import ggreer_gpg_key.asc

After downloading the tarball and signature, run:

    gpg --verify the_silver_searcher-{{ page.releases|first }}.tar.gz.asc \
                 the_silver_searcher-{{ page.releases|first }}.tar.gz

<br />

## Are we fast yet?

See [graphs of performance across releases](/ag/speed/).

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

## Related posts
{% for post in site.categories.the_silver_searcher %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}
