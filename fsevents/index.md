---
layout: page
title: FSEvents Tools
releases:
- 0.2.1
- 0.2.0
---

FSEvents Tools are the OS X counterpart to Linux's [inotify-tools](https://github.com/rvoicilas/inotify-tools). See [the GitHub page](https://github.com/ggreer/fsevents-tools) for more info.

Release tarballs are signed with [my public key](/ggreer_gpg_key.asc) (3F0A04B6). To verify a release, first download my public key and import it:

    gpg --import ggreer_gpg_key.asc

After downloading the tarball and signature, run:

    gpg --verify fsevents-tools-{{ page.releases|first }}.tar.gz.asc \
                 fsevents-tools-{{ page.releases|first }}.tar.gz
<br />

## Releases
{% for release in page.releases %}
* [`fsevents-tools-{{ release }}.tar.gz`](releases/fsevents-tools-{{ release }}.tar.gz) <span class="gpg_sig">[`GPG signature`](releases/fsevents-tools-{{ release }}.tar.gz.asc)</span>
{% endfor %}


<br />

## Related posts
{% for post in site.categories.fsevents %}
* [{{ post.title }}]({{ post.url }})
{% endfor %}
