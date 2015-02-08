---
date: '2015-02-07 22:17:53'
layout: post
slug: optimizing-ag-special-casing-file-extensions
published: true
title: 'Optimizing Ag: Special-casing File Extensions'
categories:
- Computers
- the_silver_searcher
---

Ever since I [added pthreads to Ag]({% post_url 2012-09-07-the-silver-searcher-adding-pthreads %}), profiling showed significant time spent processing ignore patterns. For each file Ag comes across, it must consult patterns in `.gitignore`, `.agignore`, `.hgignore`, etc. In addition, it must check for matching patterns in the file's parent directores. For example: Is `~/code/ag/tests/one_device.t.err` ignored? The answer can depend on ignore files in `~/code/ag/tests/`, `~/code/ag/`, `~/code/`, and even the user's global ignore patterns. To get some idea of the complexity of these operations, try running Ag with `--debug`.

Ignoring files correctly is difficult. It takes a lot of trickery to also do it efficiently. Ag has some basic optimizations for ignore patterns. Patterns without regex characters (`*`, `!`, `?`, etc) are loaded into sorted arrays so they can be binary searched. This is gives O(log(n)) performance instead of O(n). Granted, n isn't huge in these cases, but it's enough to make a difference. 

Unfortunately, many patterns are `fnmatch()` regexes. If you have `*.tar` in your `~/.gitignore`, Ag will be forced to run `fnmatch("*.tar", ...)` for every file it encounters. The work is doubled if you have two regexes in your root ignore, tripled for three, and so on. Considering this is O(n * m) (where n is the number of regex patterns and m is the number of files), it's amazing Ag is fast at all.


[![](/images/Screen Shot 2015-02-07 at 23.05.16.png)](/images/Screen Shot 2015-02-07 at 23.05.16.png)

On my dev laptop, Ag spent 727 milliseconds in `path_ignore_search()`, accounting for 15% of total execution time. Worse, it's in the main thread. 


A few weeks ago

https://github.com/ggreer/the_silver_searcher/pull/586

https://github.com/ggreer/the_silver_searcher/commit/0b5c9ed58dfb60e84e5f327e3e9ce015a6ee7c71

Here's the unoptimized version on my dev laptop. My `~/code/` directory is 6.7GB, though Ag only searches 0.76GB of that.

{% highlight text %}
ggreer@carbon:~/code% time ./ag/ag cpu_set_t
./ag/ag cpu_set_t  2.93s user 2.31s system 281% cpu 1.859 total
{% endhighlight %}

Now with extension-detection:

{% highlight text %}
ggreer@carbon:~/code% time ./ag/ag cpu_set_t
./ag/ag cpu_set_t  2.38s user 2.22s system 310% cpu 1.483 total
{% endhighlight %}

A 25% improvement. Not bad! I'm not cherry-picking these results. They're medians of 5 runs each. Variance was < 0.05 seconds for each run.

Profiling confirms the speedup in `path_ignore_search()`:

[![](/images/Screen Shot 2015-02-07 at 23.04.00.png)](/images/Screen Shot 2015-02-07 at 23.04.00.png)

133 milliseconds! Much better!
