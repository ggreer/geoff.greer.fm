---
date: '2012-01-23 10:47:36'
layout: post
slug: making-programs-faster-profiling
status: publish
title: 'Making Ag Faster: Profiling with Valgrind'
wordpress_id: '1070'
categories:
- Computers
- the_silver_searcher
---

These days, a lot of software is written to be "fast enough". Since code bases can be very large, there's no such thing as "fast enough" for [The Silver Searcher](https://github.com/ggreer/the_silver_searcher). In fact, my main goal with Ag is speed.

Improving performance is not always easy, but it is simple:


1. Find the slowest part of the program.
2. Make that part faster.
3. Repeat until it's fast enough or you go insane.


There are lots of profiling tools and programmers often argue about which is the best. I use [gprof](http://www.cs.utah.edu/dept/old/texinfo/as/gprof.html), [callgrind](http://valgrind.org/docs/manual/cl-manual.html), and [Instruments.app](http://developer.apple.com/library/mac/#documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/Introduction/Introduction.html). Which profiler you use doesn't matter as much as _actually using one_. They all have their advantages and disadvantages, but for this post I'll only cover [Valgrind's](http://valgrind.org/) callgrind. Using callgrind doesn't require special compilation. Just invoke it with your program's name and it will generate profiling data for callgrind_annotate to analyze.

Here's a typical profiling run for Ag:

{% highlight text %}
$ make clean && ./build.sh
(snip)
$ time valgrind --tool=callgrind --dsymutil=yes ./ag --literal abcdefghijklmnopqrstuvwxyz ../
(snip)
real	1m34.709s
user	1m33.206s
sys	0m1.492s
$ callgrind_annotate --auto=yes callgrind.out.10361 
--------------------------------------------------------------------------------
Profile data file 'callgrind.out.10361' (creator: callgrind-3.6.1-Debian)
--------------------------------------------------------------------------------
I1 cache: 
D1 cache: 
LL cache: 
Timerange: Basic block 0 - 798409857
Trigger: Program termination
Profiled target:  ./ag --literal abcdefghijklmnopqrstuvwxyz ../ (PID 10361, part 1)
Events recorded:  Ir
Events shown:     Ir
Event sort order: Ir
Thresholds:       99
Include dirs:     
User annotated:   
Auto-annotation:  on

--------------------------------------------------------------------------------
           Ir 
--------------------------------------------------------------------------------
3,068,387,924  PROGRAM TOTALS

--------------------------------------------------------------------------------
           Ir  file:function
--------------------------------------------------------------------------------
1,764,541,095  src/util.c:ag_strnstr [/home/geoff/code/the_silver_searcher/ag]
  386,020,821  /build/buildd/eglibc-2.13/posix/fnmatch_loop.c:internal_fnmatch [/lib/x86_64-linux-gnu/libc-2.13.so]
  226,548,868  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/multiarch/../strcmp.S:__GI_strncmp [/lib/x86_64-linux-gnu/libc-2.13.so]
  181,861,517  src/util.c:is_binary [/home/geoff/code/the_silver_searcher/ag]
  123,211,270  /build/buildd/eglibc-2.13/posix/fnmatch.c:fnmatch@@GLIBC_2.2.5 [/lib/x86_64-linux-gnu/libc-2.13.so]
  104,867,805  src/print.c:print_file_matches [/home/geoff/code/the_silver_searcher/ag]
   77,058,570  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/multiarch/../strlen.S:__GI_strlen [/lib/x86_64-linux-gnu/libc-2.13.so]
   60,030,629  /build/buildd/eglibc-2.13/posix/fnmatch_loop.c:internal_fnmatch'2 [/lib/x86_64-linux-gnu/libc-2.13.so]
   44,019,376  src/ignore.c:filename_filter [/home/geoff/code/the_silver_searcher/ag]
   27,072,821  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/memchr.S:memchr [/lib/x86_64-linux-gnu/libc-2.13.so]
    9,329,984  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/multiarch/../strcmp.S:__GI_strcmp [/lib/x86_64-linux-gnu/libc-2.13.so]
    7,803,075  /build/buildd/eglibc-2.13/malloc/malloc.c:_int_malloc [/lib/x86_64-linux-gnu/libc-2.13.so]
    7,040,644  /build/buildd/eglibc-2.13/posix/../locale/weight.h:internal_fnmatch
    6,062,124  /build/buildd/eglibc-2.13/string/../string/memmove.c:__GI_memmove [/lib/x86_64-linux-gnu/libc-2.13.so]
    4,384,383  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/multiarch/../memcpy.S:__GI_memcpy [/lib/x86_64-linux-gnu/libc-2.13.so]
    3,951,640  /build/buildd/eglibc-2.13/malloc/malloc.c:_int_free [/lib/x86_64-linux-gnu/libc-2.13.so]
    3,779,300  /build/buildd/eglibc-2.13/dirent/../sysdeps/unix/readdir.c:readdir [/lib/x86_64-linux-gnu/libc-2.13.so]
    3,181,118  /build/buildd/eglibc-2.13/malloc/malloc.c:malloc [/lib/x86_64-linux-gnu/libc-2.13.so]
(snip)
{% endhighlight %}

I snipped out the annotated source code. You can see the full output [here](/code/ag_callgrind_slow.txt).

This profiling info tells me that I'm spending all my time in strnstr(). I did some research on string-matching and found out about the [Boyer-Moore algorithm](http://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm). After some [more reading](http://blog.phusion.nl/2010/12/06/efficient-substring-searching/), I decided to go with a simplified version of Boyer-Moore called [Boyer-Moore-Horspool](http://en.wikipedia.org/wiki/Boyer%E2%80%93Moore%E2%80%93Horspool_algorithm).

Here's the data after I [implemented](https://github.com/ggreer/the_silver_searcher/pull/12) Boyer-Moore-Horspool strstr:


{% highlight text %}
$ time valgrind --tool=callgrind ./ag --literal abcdefghijklmnopqrstuvwxyz ../
real	0m32.429s
user	0m31.034s
sys	0m1.324s
$ callgrind_annotate --auto=yes callgrind.out.11921
--------------------------------------------------------------------------------
Profile data file 'callgrind.out.11921' (creator: callgrind-3.6.1-Debian)
--------------------------------------------------------------------------------
I1 cache: 
D1 cache: 
LL cache: 
Timerange: Basic block 0 - 228181262
Trigger: Program termination
Profiled target:  ./ag --literal abcdefghijklmnopqrstuvwxyz ../ (PID 11921, part 1)
Events recorded:  Ir
Events shown:     Ir
Event sort order: Ir
Thresholds:       99
Include dirs:     
User annotated:   
Auto-annotation:  on

--------------------------------------------------------------------------------
           Ir 
--------------------------------------------------------------------------------
1,139,437,344  PROGRAM TOTALS

--------------------------------------------------------------------------------
         Ir  file:function
--------------------------------------------------------------------------------
386,014,011  /build/buildd/eglibc-2.13/posix/fnmatch_loop.c:internal_fnmatch [/lib/x86_64-linux-gnu/libc-2.13.so]
181,870,097  src/util.c:is_binary [/home/geoff/code/the_silver_searcher/ag]
123,209,345  /build/buildd/eglibc-2.13/posix/fnmatch.c:fnmatch@@GLIBC_2.2.5 [/lib/x86_64-linux-gnu/libc-2.13.so]
104,867,805  src/print.c:print_file_matches [/home/geoff/code/the_silver_searcher/ag]
 76,747,163  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/multiarch/../strlen.S:__GI_strlen [/lib/x86_64-linux-gnu/libc-2.13.so]
 63,421,170  src/util.c:boyer_moore_strnstr [/home/geoff/code/the_silver_searcher/ag]
 60,028,609  /build/buildd/eglibc-2.13/posix/fnmatch_loop.c:internal_fnmatch'2 [/lib/x86_64-linux-gnu/libc-2.13.so]
 44,018,667  src/ignore.c:filename_filter [/home/geoff/code/the_silver_searcher/ag]
 27,072,637  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/memchr.S:memchr [/lib/x86_64-linux-gnu/libc-2.13.so]
  8,312,570  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/multiarch/../strcmp.S:__GI_strcmp [/lib/x86_64-linux-gnu/libc-2.13.so]
  7,803,075  /build/buildd/eglibc-2.13/malloc/malloc.c:_int_malloc [/lib/x86_64-linux-gnu/libc-2.13.so]
  7,040,534  /build/buildd/eglibc-2.13/posix/../locale/weight.h:internal_fnmatch
  6,061,868  /build/buildd/eglibc-2.13/string/../string/memmove.c:__GI_memmove [/lib/x86_64-linux-gnu/libc-2.13.so]
  4,384,383  /build/buildd/eglibc-2.13/string/../sysdeps/x86_64/multiarch/../memcpy.S:__GI_memcpy [/lib/x86_64-linux-gnu/libc-2.13.so]
  3,951,640  /build/buildd/eglibc-2.13/malloc/malloc.c:_int_free [/lib/x86_64-linux-gnu/libc-2.13.so]
  3,779,220  /build/buildd/eglibc-2.13/dirent/../sysdeps/unix/readdir.c:readdir [/lib/x86_64-linux-gnu/libc-2.13.so]
  3,181,118  /build/buildd/eglibc-2.13/malloc/malloc.c:malloc [/lib/x86_64-linux-gnu/libc-2.13.so]
  3,089,135  src/main.c:search_dir'2 [/home/geoff/code/the_silver_searcher/ag]
  2,095,514  /build/buildd/eglibc-2.13/malloc/malloc.c:free [/lib/x86_64-linux-gnu/libc-2.13.so]
  2,018,298  /build/buildd/eglibc-2.13/dirent/../sysdeps/wordsize-64/../../dirent/scandir.c:scandir [/lib/x86_64-linux-gnu/libc-2.13.so]
  1,941,992  /build/buildd/eglibc-2.13/string/strcoll_l.c:strcoll_l [/lib/x86_64-linux-gnu/libc-2.13.so]
  1,889,859  /build/buildd/eglibc-2.13/stdlib/msort.c:msort_with_tmp.part.0'2 [/lib/x86_64-linux-gnu/libc-2.13.so]
  1,704,553  /build/buildd/eglibc-2.13/malloc/malloc.c:malloc_consolidate.part.3 [/lib/x86_64-linux-gnu/libc-2.13.so]
  1,644,688  src/ignore.c:ignorefile_filter [/home/geoff/code/the_silver_searcher/ag]
  1,601,628  /build/buildd/eglibc-2.13/dirent/../sysdeps/unix/sysv/linux/getdents.c:__getdents [/lib/x86_64-linux-gnu/libc-2.13.so]
  1,582,620  src/util.c:strlcat [/home/geoff/code/the_silver_searcher/ag]
(snip)
{% endhighlight %}



For the curious, full output of callgrind_annotate is [here](/code/ag_callgrind.txt).

That's a 3x overall speedup and a 27x speedup in string matching. Impressive! Now Ag is spending most of the time figuring out whether or not it should search a file. It's clear where I need to optimize next.

Valgrind isn't perfect though. It makes programs run 25-50x slower than they normally would, so you won't notice if you're spending all your time waiting for network or disk I/O. In the case of Ag, this turned into a 20% performance improvement in my benchmarks. 

Getting more useful data requires switching from an instrumenting profiler to a sampling profiler. Both Instruments.app and gprof are sampling profilers, but this post is already too long. I'll cover them some other time.
