---
date: '2011-12-27 16:36:40'
layout: post
slug: the-silver-searcher-better-than-ack
status: publish
title: 'The Silver Searcher: Better than Ack'
wordpress_id: '962'
categories:
- Computers
---

A lot of my time spent "writing" code is actually spent reading code. And a decent chunk of my time spent reading code is actually spent searching code. Lately I've started working with a larger codebase.\[1\] Both grep and ack take a non-negligible amount of time to search it. Both are slow, but for different reasons. [Grep](http://www.gnu.org/s/grep/) is fast, but doesn't ignore files.\[2\] [Ack](http://betterthangrep.com/) is very good at ignoring files, but it's written in Perl instead of C. What I really want is something that's fast _and_ ignores files.

So I built it. I call it [The Silver Searcher](https://github.com/ggreer/the_silver_searcher), or [Ag](http://en.wikipedia.org/wiki/Symbol_(chemical_element)) for short. Ag is like ack, but better. It's fast. It's damn fast. The only thing faster is stuff that builds indicies beforehand, like [Exuberant Ctags](http://ctags.sourceforge.net/).

Don't believe me? Here are some benchmarks. I ran them multiple times and grabbed the median for each.


{% highlight text %}
ggreer@carbon:~/cloudkick/reach% du -sh
250M	.

ggreer@carbon:~% time grep -r -i SOLR ~/cloudkick/reach | wc -l
     617
11.06s user 0.81s system 96% cpu 12.261 total

ggreer@carbon:~% time ack -i SOLR ~/cloudkick/reach | wc -l
     488
2.87s user 0.78s system 97% cpu 3.750 total

ggreer@carbon:~% time ag -i SOLR ~/cloudkick/reach | wc -l
     573
1.00s user 0.51s system 95% cpu 1.587 total
{% endhighlight %}


Here's Ag with some extra ignores, similar to how ack ignores many files by default:

{% highlight text %}
ggreer@carbon:~% cat ~/cloudkick/reach/.agignore 
extern
release
fixtures
ggreer@carbon:~% time ag -i SOLR ~/cloudkick/reach | wc -l
     499
0.35s user 0.15s system 94% cpu 0.528 total
{% endhighlight %}

That's the same as [git grep](http://book.git-scm.com/4_finding_with_git_grep.html):


{% highlight text %}
ggreer@carbon:~/cloudkick/reach% time git grep -i SOLR ~/cloudkick/reach | wc -l
     489
0.32s user 0.58s system 161% cpu 0.556 total
{% endhighlight %}



...except git grep only works in git repos. And it doesn't ignore stuff in the repository like extern or generated files.\[3\]

The bottom line: Grep's output was the least useful. It dutifully reported matches in .pyc files and other things I don't care about. Ack's results were better and faster than grep. Ag had more results than ack, but **took half as long.** With a couple of clever ignores (like the extern directory), Ag took a mere half-second and gave even more pertinent results.

I can already hear someone saying, "Big deal. It's only a second faster. What does one second matter when searching an entire codebase?" My reply: [trivial inconveniences matter](http://lesswrong.com/lw/f1/beware_trivial_inconveniences/). Using Ag is like having a faster computer; you don't realize how slow things were until you've experienced fast. The difference is big enough that I can't go back to ack, just like ack users can't go back to grep.

Since it behaves like ack, Ag can be used by many fancy ack GUI front-ends. This makes searching convenient as well as fast. After I got Ag sorta-working, I forked [AckMate](https://github.com/protocool/AckMate/) so that I could use Ag in [my favorite editor](http://macromates.com/). [My fork](https://github.com/ggreer/AckMate/) bundles both AckMate's Ack and my own Ag. You can switch between them with a simple check box. The tmbundle is on the [downloads page](https://github.com/ggreer/AckMate/downloads). Be warned: it replaces your current AckMate.

There's still plenty of stuff I want to add,\[4\] but it's good enough for my own daily use so I figured I should tell others about it. And of course, patches are welcome!

  

  

  

Footnotes:

1. The decision was made to put all python dependencies into extern/ instead of using pip. A good call, in my opinion.
2. At least not without a bunch of pipes and find and xargs. Yes I know there are aliases but it's annoying to keep those up-to-date.
3. Yes, I know it's bad form to put generated files in revision control. 
4. Ctags support, for one. Also inverted matching, accepting piped input, and basic stuff like retrying a search with fewer ignores and no case-sensitivity.

