---
date: '2014-03-15 15:26:29'
layout: post
slug: public-project-sign-your-releases
published: true
title: Public Project? Sign Your Releases
categories:
- Computers
---

These instructions assume you have a GPG key. If you don't, 



First, build a release. Here's my build procedure for Ag:

{% highlight text %}
ggreer@carbon:~/code/ag% make distclean
...
ggreer@carbon:~/code/ag% ./build.sh 
...
ggreer@carbon:~/code/ag% make dist
{% endhighlight %}

This should give you a release tarball:

{% highlight text %}
ggreer@carbon:~/code/ag% ls *.gz
the_silver_searcher-0.20.0.tar.gz
ggreer@carbon:~/code/ag% gpg --detach-sign --armor the_silver_searcher-0.20.0.tar.gz

You need a passphrase to unlock the secret key for
user: "Geoff Greer <xxxxx@xxxxx.x>"
4096-bit RSA key, ID 3F0A04B6, created 2010-01-26
ggreer@carbon:~/code/ag% ls *.tar.gz*
the_silver_searcher-0.20.0.tar.gz      the_silver_searcher-0.20.0.tar.gz.asc
{% endhighlight %}

Of course, you should make sure the signature verifies:

{% highlight text %}
ggreer@carbon:~/code/ag% gpg --verify the_silver_searcher-0.20.0.tar.gz.asc the_silver_searcher-0.20.0.tar.gz
gpg: Signature made Sat Mar 15 15:48:24 2014 PDT using RSA key ID 3F0A04B6
gpg: Good signature from "Geoff Greer <xxxxx@xxxxx.x>"
ggreer@carbon:~/code/ag% 
{% endhighlight %}

Once you have a signature that verifies, you should upload both the asc file and release tarball.
