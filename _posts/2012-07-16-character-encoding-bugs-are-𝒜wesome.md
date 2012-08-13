---
date: '2012-08-12 14:56:54'
layout: post
slug: character-encoding-bugs-are-&#x1D49C;wesome!
title: 'Character encoding bugs are &#x1D49C;wesome!'
published: true
permalink: /2012/08/12/character-encoding-bugs-are-%F0%9D%92%9Cwesome/
categories:
- Computers
---

Before I delve into things, I want to make my terminology clear. When I say, "UTF-8", I am talking about [the common encoding scheme for Unicode characters](http://en.wikipedia.org/wiki/UTF-8). When I say "utf8", I am talking about [MySQL's utf8 character set](http://dev.mysql.com/doc/refman/5.5/en/charset-unicode-utf8.html). I hope you don't find this confusing, but I wanted to avoid wordiness. The two terms may look similar, but they refer to things that are as different as apples and flamethrowers.

A few weeks ago, I had a fun time dealing with UTF-8 and MySQL. At work, we had a problem: Trying to save certain characters to the database caused Django exceptions. This confused me, because MySQL's character set was utf8, and its collation was utf8\_general\_ci. That meant it should handle anything thrown at it. 

Or so I thought.

I soon learned that [MySQL's utf8 charset doesn't support all of UTF-8](http://golem.ph.utexas.edu/~distler/blog/archives/002539.html). It only supports Unicode characters that, when encoded as UTF-8, are shorter than 4 bytes. That covers the [Basic Multilingual Plane](http://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane), but there are 15 other planes in the Unicode standard. Fortunately, MySQL added support for a new encoding: utf8mb4. So it should just be a matter of running the right `ALTER TABLE` statements, right?

Oh-ho-ho! If only it were so simple. But I don't write about simple fixes. The fact that this post exists means I went on a great journey.

{% highlight mysql %}
mysql> ALTER TABLE foo CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ERROR 1709 (HY000): Index column size too large. The maximum column size is 767 bytes.
{% endhighlight %}

This is when I discovered that [InnoDB limits index columns to 767 bytes](http://dev.mysql.com/doc/refman/5.5/en/create-index.html). Why is this suddenly an issue? Changing the charset also changes the number of bytes needed to store a given string. With MySQL's utf8 charset, each character could use up to 3 bytes. With utf8mb4, that goes up to 4. If you have an index on a 255 character column, that would be 765 bytes with utf8. Just under the limit. Switching to utf8mb4 raises that index to 1020 bytes (4 * 255). The solution? Delete the old index, alter the table, then create a new index that is only on the first 191 characters of the column.

How does one find the offending index? `SHOW INDEXES FROM foo;` will show all indexes on the table. Combine that with `DESCRIBE foo;` and you can figure out which indexes are on columns longer than 191 characters. With that out of the way, back to the action:

{% highlight mysql %}
mysql> DROP INDEX foo_1234 on foo;
Query OK, 0 rows affected (0.00 sec)
Records: 0  Duplicates: 0  Warnings: 0
mysql> ALTER TABLE foo CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
Query OK, 0 rows affected (0.11 sec)
Records: 0  Duplicates: 0  Warnings: 0
CREATE INDEX foo_1234 ON foo (`baz`(191));
{% endhighlight %}

You might ask, "OK, now we're finished, right?" If I were talking to you in person, you would have just seen me inhale through my teeth while rubbing the back of my neck. It's not so simple. MySQL's utf8 charset is case-insensitive. The utf8mb4 charset is case-*sensitive*. The implications are vast. This change in constraints forces you to sanitize the data currently in your DB, then make sure you don't insert anything with the wrong casing. At work, there was much weeping and gnashing of teeth.

Once *that* problem was taken care of, there was only the trifle of monkey-patching Django to support MySQL's utf8mb4 charset. Currently, [Django doesn't support it](https://code.djangoproject.com/ticket/18392). Sadly, I forgot to ask my manager for permission to release that code. You'll have to use your imagination.


My thanks goes out to everyone who helped fix this bug at work. Matt, Brad, Ying, David, Mark, and more. 

PS: I had to work around some bugs in WEBrick, libcloud, and Amazon S3 to post this. Apparently, a lot of software can't handle &#x1D49C;wesomeness.
