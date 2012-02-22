---
date: '2012-01-30 08:11:28'
layout: post
slug: programming-we-can-do-science
status: publish
title: 'Programming: We can do Science'
wordpress_id: '1174'
categories:
- Computers
---

Let's say you're messing with some Python and you forget how the `global` keyword changes scoping\[1\]. To find the answer you might try...


1. [Google](https://www.google.com/)
2. [Stack Overflow](http://stackoverflow.com/)
3. [Actually reading the docs](http://docs.python.org/)
4. Asking someone who knows more about it than you


...usually in that order. That's not a terrible way of going about it, but there's an oft-overlooked option. Instead of scouring documentation or bugging a coworker, sometimes it's best to run experiments.

This code...

{% highlight python %}
#!/usr/bin/env python

blah = 1

def foo():
    blah = 0
    print "foo:blah", blah

print "global:blah", blah
foo()
print "global:blah", blah
{% endhighlight %}


...prints...

{% highlight text %}
global:blah 1
foo:blah 0
global:blah 1
{% endhighlight %}



While adding a `global` in foo...


{% highlight python %}
#!/usr/bin/env python

blah = 1

def foo():
    global blah
    blah = 0
    print "foo:blah", blah

print "global:blah", blah
foo()
print "global:blah", blah
{% endhighlight %}


...prints...

{% highlight text %}
global:blah 1
foo:blah 0
global:blah 0
{% endhighlight %}


Without `global`, foo's blah is not the same blah. With `global`, it is.

These sorts of code blurbs are great for learning. They're also great for solving disagreements about code behavior. Warning: You will be wrong sometimes. You will look stupid in front of your peers. On the bright side, these embarrassing moments will stick in your mind. You won't forget what you were wrong about.

Code experiments can be much trickier, and much more useful, than above. For example...

...at work we recently switched a project's MySQL engine from [MyISAM](http://en.wikipedia.org/wiki/MyISAM) to [InnoDB](http://en.wikipedia.org/wiki/InnoDB). After the switch, we encountered some weird errors. A process would save an object to the DB, but some services couldn't find the newly-created object\[2\]. I had a hunch that transactions were responsible for the weirdness; my reasoning being that MyISAM lacks transaction support, and it had worked fine.

So I did science. I opened up two MySQL consoles. In console #1, I ran `start transaction;`. Then in console #2, I ran:

{% highlight mysql %}
mysql> start transaction;
Query OK, 0 rows affected (0.00 sec)

mysql> insert into inventory_nodeaddress (node_id, ip, ip_version, type) values (NULL, '31.22.190.54', 4, 0);
Query OK, 1 row affected (0.00 sec)

mysql> commit;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from inventory_nodeaddress where node_id is NULL;
+-----+---------+-------------------------------------+------------+------+
| id  | node_id | ip                                  | ip_version | type |
+-----+---------+-------------------------------------+------------+------+
| 106 |    NULL | 50.57.96.184                        |          4 |    0 |
| 107 |    NULL | 10.182.67.171                       |          4 |    1 |
| 147 |    NULL | 31.22.190.54                        |          4 |    0 |
+-----+---------+-------------------------------------+------------+------+
3 rows in set (0.00 sec)

mysql>
{% endhighlight %}



OK, the data's committed. I even double-checked that it was there by selecting it. Everything is fine, right?

Nope. Back in console #1, I ran:



{% highlight mysql %}
mysql> select * from inventory_nodeaddress where node_id is NULL;
+-----+---------+-------------------------------------+------------+------+
| id  | node_id | ip                                  | ip_version | type |
+-----+---------+-------------------------------------+------------+------+
| 106 |    NULL | 50.57.96.184                        |          4 |    0 |
| 107 |    NULL | 10.182.67.171                       |          4 |    1 |
+-----+---------+-------------------------------------+------------+------+
2 rows in set (0.00 sec)

mysql>
{% endhighlight %}



Once I ended the transaction in console #1 (either through a rollback or a commit), the new row showed up in selects. After some Googling I finally found [the relevant MySQL documentation](http://dev.mysql.com/doc/refman/5.0/en/set-transaction.html#isolevel_read-committed). Once I changed the transaction isolation from `REPEATABLE-READ` to `READ-COMMITTED`, selects inside transactions showed recently-inserted rows.

The experiment plus [Brad](https://github.com/morgabra)'s knowledge of Django helped solve the mystery. Django only runs `commit` when writing to the DB. This sucks for any long-running service that never writes. The service will start up, connect to MySQL, run `start transaction` and do selects without ever ending the transaction. With the default InnoDB configuration, these services will see an ever-older version of the database. Not fun.

After I added `transaction-isolation = READ-COMMITTED` to the my.cnf [chef](http://wiki.opscode.com/display/chef/Home) template, everything worked swimmingly. Hooray for science.

The next time you're stumped, try some experiments. As a programmer, you have immense power over the program's universe. Your code runs on a perfectly deterministic machine\[3\]. With the right software tools, you can stop time. You can read or change any part of memory. [You can step through](http://en.wikipedia.org/wiki/GNU_Debugger), [one line at a time](http://docs.python.org/library/pdb.html), to see exactly what's happening.

Of course, this isn't _real_ science. These apparati make programming a cakewalk compared to real science.



Footnotes:

1. You forgot this fact not because you suck at Python, but because you usually write clean code with no globals. At least, that's what you keep telling yourself.
2. Just so nobody freaks out: This thing is non-customer-facing and currently under heavy development. I'm also over-simplifying the process. The actual changes happened in a development branch and weren't merged until things were hunky-dory.
3. [Cosmic rays](http://en.wikipedia.org/wiki/Single_event_upset) notwithstanding.
