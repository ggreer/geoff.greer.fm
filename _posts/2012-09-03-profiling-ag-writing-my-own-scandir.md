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
This is a run of revision a87aa8f8; right before I [reverted the performance regression](https://github.com/ggreer/the_silver_searcher/commit/e344ca087099431c1bcf733b3ae28316f6932683). You can see it spends 80% of execution time in `fnmatch()`.


[![](/images/ag_profile_0.9.png)](/images/ag_profile_0.9.png)
This is tagged release 0.9. Much faster, and it only spends about half the time in `fnmatch()`.


[![](/images/ag_profile_ag_scandir.png)](/images/ag_profile_ag_scandir.png)
Finally, here's a run after merging [pull request #56](https://github.com/ggreer/the_silver_searcher/pull/56). This fixed [issue #43](https://github.com/ggreer/the_silver_searcher/issues/43) and improved performance for many cases. I'm rather proud of that pull request, since it fixed a lot of issues. The rest of this post explains the specific changes I made to get everything working the way I wanted.

First, I should explain Ag's old behavior. Before I merged that pull request, Ag called [`scandir()`](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man3/scandir.3.html) on each directory. Then `scandir()` called `filename_filter()` on every entry in the directory. To figure out if a file should be ignored, `filename_filter()` called `fnmatch()` on every entry in the global `char *ignore_patterns[]`. This set-up had several problems:

1. `scandir()` didn't let me pass any useful state to `filename_filter()`. The filter could only base its decision on the `dirent` and any globals.
1. `ignore_patterns` was just an array of strings. It couldn't keep track of a hierarchy of ignore files in subdirectories. This made some ignore entries behave incorrectly (issue #43). This also hurt performance.

Fixing these issues required rejiggering some things. First, [I wrote my own `scandir()`](https://github.com/ggreer/the_silver_searcher/blob/3deff34b45fa7e41bb9d7219029d8126c201bda5/src/scandir.c#L7). The most important difference is that my version lets you pass a pointer to the filter function. This pointer could be to say... a struct containing a hierarchy of ignore patterns.

Surprise surprise, the next thing I did was make [a struct for ignore patterns](https://github.com/ggreer/the_silver_searcher/blob/3deff34b45fa7e41bb9d7219029d8126c201bda5/src/ignore.h#L11):

{% highlight c %}
struct ignores {
    char **names; /* Non-regex ignore lines. Sorted so we can binary search them. */
    size_t names_len;
    char **regexes; /* For patterns that need fnmatch */
    size_t regexes_len;
    struct ignores *parent;
};
{% endhighlight %}

This is sort of an unusual structure. Parents don't have pointers to their children, but they don't need to. I simply allocate the ignore struct, search the directory, then free the struct. This is done around [line 340 of search.c](https://github.com/ggreer/the_silver_searcher/blob/3deff34b45fa7e41bb9d7219029d8126c201bda5/src/search.c#L341). Searching is recursive, so children are freed before their parents.

The final change was to [rewrite `filename_filter()`](https://github.com/ggreer/the_silver_searcher/blob/3deff34b45fa7e41bb9d7219029d8126c201bda5/src/ignore.c#L204). It calls `fnmatch()` on every entry in the ignore struct passed to it. If none of those match and `ig->parent` isn't `NULL`, it repeats the process with the parent ignore struct, and so-on until it reaches the top.

All-in-all, not a bad change-set. I fixed a lot of things I'd been meaning to fix for a while. I also managed to clean up quite a bit of code. If not for my re-implementation of `scandir()`, the pull request would have removed more lines than it added.

One last thing: I'd like to praise a piece of software and criticize another. I tip my hat to [Instruments.app](http://developer.apple.com/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/Introduction/Introduction.html). I've found it invaluable for finding the causes of many memory leaks and performance issues. But I wag my finger at git. Git allows `.gitignore` files in any directory, and it allows these files to contain regular expressions. Worse, these regexes can reference sub-directories. For example, `foo/*/bar` is a valid ignore pattern. Regular expressions plus directory hierarchies translate to complicated implementations and confusing behavior for users. It's no fun for anyone involved.
