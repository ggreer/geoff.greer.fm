---
date: '2012-08-28 02:23:33'
layout: post
slug: generating-analytics-from-s3-logs
title: 'Generating Analytics from S3 Logs'
published: true
categories:
- Computers
---

I'm quite glad I moved my site to Amazon S3, but the transition left me lacking a couple of features. The biggest gap for me was log analytics. DreamHost automatically runs [Analog](http://www.analog.cx/) on your site's logs. Analog certainly isn't the most advanced log stats tool, but it's better than nothing. I find it very useful for catching hot-linkers and other bandwidth hogs.

Anywho, what follows is a half-baked guide to getting logs and stats generation working for any S3-hosted site.

The first step is to [enable S3 logging](http://docs.amazonwebservices.com/AmazonS3/latest/dev/LoggingHowTo.html). Instead of following that guide like I did, you can save yourself a lot of time by using the [S3 Management Console](https://console.aws.amazon.com/s3/home). Take a look at a bucket's properties and click on the logging tab:

![](/images/enable_s3_logging.png)

Ta-da! Much easier than using `s3curl.pl`.

At this point, S3 should start saving log files to your logging bucket. Now the trick is to download and parse them. With the help of [libcloud](https://libcloud.apache.org/), I wrote a little Python script to download all logs.

{% highlight python %}
#!/usr/bin/env python

import hashlib
from libcloud.storage.types import Provider
from libcloud.storage.providers import get_driver

key = "access_key_id"
secret = "secret_access_key"
container_name = "blah-logs"
path = "logs/access_log"
delete_files = False

storage_driver = get_driver(Provider.S3)
provider = storage_driver(key, secret)
container = provider.get_container(container_name)
container_objects = provider.list_container_objects(container)

def md5(path):
    f = open(path)
    data = True
    md5sum = hashlib.md5()
    while data:
        data = f.read(2**20)
        md5sum.update(data)
    f.close()
    return md5sum.hexdigest()

for obj in container_objects:
    if obj.name[0:len(path)] == path:
        try:
            file_md5 = md5(obj.name)
        except Exception, e:
            file_md5 = 0
        if file_md5 != obj.hash:
            obj.download(obj.name)
        if delete_files:
            obj.delete()

{% endhighlight %}

Typically, S3's log files are small. I didn't want to make things more complicated by using Twisted, so this script doesn't download them in parallel. That means the first run can take a while. Be patient, and add some `print`s if you want to see progress. The script only downloads files that aren't already saved locally, so future runs should be much faster.

With the logs saved locally, it's time to parse them. [S3's log format](http://docs.amazonwebservices.com/AmazonS3/latest/dev/LogFormat.html) is unique. No default configuration of Analog, AWStats, or Webalizer is going to parse it correctly. After reading S3 docs, Analog docs, and experimenting for a while, I finally got the right `LOGFORMAT`. To save everyone else's time, here it is:

{% highlight text %}
LOGFORMAT (%j %j [%d/%M/%Y:%h:%n:%j %j] %s %j %j %j %j "%j %r %j" %c %j %b %j %T %j "%f" "%B" %j)
{% endhighlight %}

Add that to your `analog.cfg`. Then edit the `LOGFILE`, `OUTFILE`, and `HOSTNAME` config lines, and you should be good to go.
