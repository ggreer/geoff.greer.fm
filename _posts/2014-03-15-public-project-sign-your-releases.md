---
date: '2014-03-15 15:26:29'
layout: post
slug: public-project-sign-your-releases
published: true
title: Public Project? Sign Your Releases
categories:
- Computers
---

I've noticed many smaller open source projects don't sign their releases. This is a bad thing. Cryptographic signatures are a great way to verify that data has not been tampered with. Without a signature, there's little to stop malicious actors from misusing your good name to distribute malware.

Here's a concrete example of how cryptographic signatures can be useful: Let's say someone hacked my site.<sup>[\[1\]](#ref_1)</sup> If they wanted, they could upload a release of Ag containing malware. Without signatures, users would blindly download the new release and end up with infected computers. But if they were in the habit of verifying signatures, they would see that either the new release had no signature or (even more alarming) it had a bad signature. They could then avoid installing the malicious release, and possibly even contact me.

With the goal of raising the security waterline<sup>[\[2\]](#ref_2)</sup>, I'll outline the steps to create and sign release tarballs. Once you know how, it's neither difficult nor time-consuming. These instructions assume you have a GPG key. If you don't, [follow these instructions](TODO FIXME) to generate one. Even if you're not signing tarballs, it's a good idea to have one.


Step one is to build a release. Here's my build procedure for [Ag](/ag/):

{% highlight text %}
ggreer@carbon:~/code/ag% make distclean
...
ggreer@carbon:~/code/ag% ./build.sh 
...
ggreer@carbon:~/code/ag% make dist
{% endhighlight %}

This should give you a release tarball...

{% highlight text %}
ggreer@carbon:~/code/ag% ls *.gz
the_silver_searcher-0.20.0.tar.gz
{% endhighlight %}

...which you can now sign:

{% highlight text %}
ggreer@carbon:~/code/ag% gpg --detach-sign --armor the_silver_searcher-0.20.0.tar.gz

You need a passphrase to unlock the secret key for
user: "Geoff Greer <xxxxx@xxxxx.x>"
4096-bit RSA key, ID 3F0A04B6, created 2010-01-26
ggreer@carbon:~/code/ag% ls *.tar.gz*
the_silver_searcher-0.20.0.tar.gz      the_silver_searcher-0.20.0.tar.gz.asc
{% endhighlight %}

The newly-generated `.asc` file is an ASCII-armored GPG signature. Without the `--armor` option, GPG would create a binary `.gpg` file. ASCII-armored signatures can be 

Of course, you should make sure the signature verifies:

{% highlight text %}
ggreer@carbon:~/code/ag% gpg --verify the_silver_searcher-0.20.0.tar.gz.asc the_silver_searcher-0.20.0.tar.gz
gpg: Signature made Sat Mar 15 15:48:24 2014 PDT using RSA key ID 3F0A04B6
gpg: Good signature from "Geoff Greer <xxxxx@xxxxx.x>"
ggreer@carbon:~/code/ag% 
{% endhighlight %}

Tada, you're done! Be sure to upload the `asc` file as well as the tarball. It might also be helpful to include instructions on how to verify the signature.

---

1. <span id="ref_1"></span>Admittedly, this would be difficult. My site is hosted entirely on [Amazon S3](). The credentials for my AWS account (and S3 bucket) are only in three places: A truecrypt image on my personal laptop, an encrypted backup in my apartment, and an encrypted backup in a different S3 bucket. The most plausible attack vector to get at these credentials would be to install malware on my laptop.
2. <span id="ref_2"></span>A reference to [Raising the Sanity Waterline]().
