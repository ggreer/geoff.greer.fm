---
date: '2012-09-03 23:38:06'
layout: post
title: 'Profiling Ag. Writing My Own Scandir'
published: true
categories:
- Computers
- the_silver_searcher
---

Although [I benchmarked every revision of Ag](/2012/08/25/the-silver-searcher-benchmarking-revisions/), I didn't profile them all. After looking at the graph in my previous post, I profiled some of the revisions where performance changed significantly.


[![](/images/ag_profile_a87aa8f822d9029243423ef0725ec03ca347141b.png)](/images/ag_profile_a87aa8f822d9029243423ef0725ec03ca347141b.png)
This is a run of revision a87aa8f8; right before I reverted the performance regression. You can see it spends 80% of execution time in `fnmatch()`.


[![](/images/ag_profile_0.9.png)](/images/ag_profile_0.9.png)
Tagged release 0.9. Much faster, and it only spends about half the time in `fnmatch()`.


[![](/images/ag_profile_ag_scandir.png)](/images/ag_profile_ag_scandir.png)
Finally, here's a run after merging [pull request #56](https://github.com/ggreer/the_silver_searcher/pull/56). This fixed [issue #43](https://github.com/ggreer/the_silver_searcher/issues/43) and improved performance for many cases.


I should explain Ag's behavior before I merged that pull request. It called [`scandir()`](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man3/scandir.3.html) on each directory. Then `scandir()` called `filename_filter()` on every entry in the directory. To figure out if a file should be ignored, `filename_filter()` called `fnmatch()` on every entry in the global `char *ignore_patterns[]`.

This set-up had several problems:

1. `scandir()` didn't let me pass any useful state to `filename_filter()`. The filter could only base its decision on the `dirent` and any globals.
1. `ignore_patterns` was just a list of ignore patterns. It couldn't keep track of a hierarchy of ignore files in subdirectories. This made some ignore entries behave incorrectly (issue #43). This also hurt performance.

Fixing these issues required rejiggering some things. First, [I wrote my own `scandir()`](https://github.com/ggreer/the_silver_searcher/blob/3deff34b45fa7e41bb9d7219029d8126c201bda5/src/scandir.c#L7). This version lets you pass a pointer to the filter function. This pointer could be to... say... a struct containing a hierarchy of ignore patterns. 

The next thing I did was make [a struct for ignore patterns](https://github.com/ggreer/the_silver_searcher/blob/3deff34b45fa7e41bb9d7219029d8126c201bda5/src/ignore.h#L11):

{% highlight c %}
struct ignores {
    char **names; /* Non-regex ignore lines. Sorted so we can binary search them. */
    size_t names_len;
    char **regexes; /* For patterns that need fnmatch */
    size_t regexes_len;
    struct ignores *parent;
};
{% endhighlight %}

This is sort of an unusual structure; the parents don't have pointers to their children. That's because they don't need to. I simply allocate and set the ignore struct, search the directory, then free the struct. This is done around [line 340 of search.c](https://github.com/ggreer/the_silver_searcher/blob/3deff34b45fa7e41bb9d7219029d8126c201bda5/src/search.c#L341). Searching is recursive, so children are freed before their parents.

The final change was to [rewrite `filename_filter()`](https://github.com/ggreer/the_silver_searcher/blob/3deff34b45fa7e41bb9d7219029d8126c201bda5/src/ignore.c#L204). Now, it calls `fnmatch()` on every entry in the ignore struct. If none of those match and `ig->parent` isn't `NULL`, it repeats the process with the parent ignore struct.



Finally, I'd like to give a shout-out to [Instruments.app](http://developer.apple.com/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/Introduction/Introduction.html). I've found it invaluable for finding the causes of any memory leaks or performance issues.