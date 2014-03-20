---
date: '2014-03-20 10:08:49'
layout: post
slug: sign-your-releases
published: true
title: Sign Your Releases!
categories:
- Computers
---

Cryptographic signatures are a great way to verify that software (or any data) has not been tampered with. Here's a concrete example of how they can be useful: Let's say (hypothetically) that I didn't sign my releases of [The Silver Searcher](/ag/). Let's also say that someone gained access to my site and uploaded a release of Ag containing malware.<sup>[\[1\]](#ref_1)</sup> Users would then blindly download the new release and end up with infected computers. But if users were in the habit of verifying signatures, they would see that the new release had no signature or (even more alarming) a bad signature. They could then avoid installing the malicious release, and possibly contact me or warn others.

Unfortunately, I rarely find projects with signed releases. This hurts *all* projects. Since signed releases are uncommon, users are be less likely to know about signatures and verify them. This defeats the entire purpose of signing releases. A signature that nobody verifies is like [a tree falling in the woods](https://en.wikipedia.org/wiki/If_a_tree_falls_in_a_forest).

With the goal of raising the security waterline<sup>[\[2\]](#ref_2)</sup>, I've outlined how to create, sign, and verify release tarballs. Once you know how to do it, the process is neither difficult nor time-consuming. These instructions assume you have a GPG key. If you don't, [Fedora's instructions](http://fedoraproject.org/wiki/Creating_GPG_Keys) are a good starting point. Even if you're not going to be signing tarballs, it's a good idea to have a GPG key.

<br />

### How to Sign a Release

Step zero is to build a release. Here's my build procedure for Ag:

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

...which you can sign:

{% highlight text %}
ggreer@carbon:~/code/ag% gpg --detach-sign --armor the_silver_searcher-0.20.0.tar.gz

You need a passphrase to unlock the secret key for
user: "Geoff Greer <xxxxx@xxxxx.x>"
4096-bit RSA key, ID 3F0A04B6, created 2010-01-26
ggreer@carbon:~/code/ag% ls *.tar.gz*
the_silver_searcher-0.20.0.tar.gz      the_silver_searcher-0.20.0.tar.gz.asc
{% endhighlight %}

The newly-generated `.asc` file is an ASCII-armored GPG signature. Without the `--armor` option, GPG would create a binary `.gpg` file. The ASCII-armored version is more versatile. It can be transmitted in any text-only medium: e-mail bodies, forum posts, chat, etc.

Once you've generated your signature, be sure to verify it:

{% highlight text %}
ggreer@carbon:~/code/ag% gpg --verify the_silver_searcher-0.20.0.tar.gz.asc the_silver_searcher-0.20.0.tar.gz
gpg: Signature made Sat Mar 15 15:48:24 2014 PDT using RSA key ID 3F0A04B6
gpg: Good signature from "Geoff Greer <xxxxx@xxxxx.x>"
ggreer@carbon:~/code/ag% 
{% endhighlight %}

At this point, you're done! Be sure to upload the `.asc` file as well as the release tarball. It can also be helpful to include instructions on how to verify signatures. Feel free to rip-off the instructions on my release pages for [The Silver Searcher](/ag/) and [FSEvents Tools](/fsevents/).

<br />

Remember, [security is a process, not a product](https://www.schneier.com/crypto-gram-0005.html). If you distribute software, you have to constantly asses threats to your users and ameliorate them. Signing releases makes users safer. The more of us who sign and verify releases, the safer we'll all be.

---

1. <span id="ref_1"></span>Admittedly, this would be difficult. My site is hosted entirely on Amazon S3. The credentials for my AWS account (and S3 bucket) are only in three places: A TrueCrypt volume on my personal laptop, an encrypted backup in my apartment, and an offsite encrypted backup. The most plausible attack vector to get my credentials would be to install malware on my laptop.
2. <span id="ref_2"></span>A reference to [Raising the Sanity Waterline](http://lesswrong.com/lw/1e/raising_the_sanity_waterline/).
