---
date: '2012-08-28 02:23:33'
layout: post
slug: s3-logging-and-analytics
title: 'S3 Logging and Analytics'
published: true
categories:
- Computers
---

I'm quite glad I moved my site from DreamHost to Amazon S3, but the transition left me missing one feature: [log analytics](http://en.wikipedia.org/wiki/Web_log_analysis_software). DreamHost automatically runs [Analog](http://www.analog.cx/) on your site's logs. Analog certainly isn't a cutting-edge tool, but it compensates for one of Google Analytics's blind spots: clients without JavaScript. This category includes bots, hot-links, and other potential bandwidth hogs. 

S3 doesn't have log analytics built-in, but it's not hard to add it yourself. What follows is a half-baked guide to getting logs and stats generation working for any S3-hosted site.

The first step is to enable S3 logging. Instead of following [this guide](http://docs.amazonwebservices.com/AmazonS3/latest/dev/LoggingHowTo.html) like I did, you can save a lot of time by using the [S3 Management Console](https://console.aws.amazon.com/s3/home). Take a look at a bucket's properties and click on the logging tab:

![](/images/enable_s3_logging.png)

I just saved you half an hour of messing with `s3curl.pl` and XML ACLs. You're welcome.

Enable logging and choose a bucket to save logs to. I suggest you set a target prefix with a slash in the name. If you don't, there will be no easy way to select all logs in the AWS management console, making batch-changes much harder.

Hooray, you've got S3 saving logs in a logging bucket. Now the trick is to download and parse them. With the help of [libcloud](https://libcloud.apache.org/), I wrote a little Python script to download all logs.

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

S3's log files are small, but numerous. I didn't want to make things more complicated by using Twisted, so this script doesn't download them in parallel. The first run can take a while, so be patient. Add some `print`s if you want to see progress. The script only downloads files that aren't already saved locally, so subsequent runs should be much faster.

With the logs saved locally, it's time to parse them. [S3's log format](http://docs.amazonwebservices.com/AmazonS3/latest/dev/LogFormat.html) is unique. No default configuration of Analog, AWStats, or Webalizer is going to parse it correctly. After reading S3 docs, Analog docs, and experimenting for a while, I finally got the right `LOGFORMAT`.

{% highlight text %}
LOGFORMAT (%j %j [%d/%M/%Y:%h:%n:%j %j] %s %j %j %j %j "%j %r %j" %c %j %b %j %T %j "%f" "%B" %j)
{% endhighlight %}

Add that to your `analog.cfg`. Then edit the `LOGFILE`, `OUTFILE`, and `HOSTNAME` config lines, and you're good to go. The final result should look [something like my stats](/stats/). Nothing amazing, but it gets the job done.

