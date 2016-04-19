---
date: '2016-02-04 22:29:02'
layout: post
slug: on-learning-c-part-3-c-programming-substance-guidelines
published: true
title: 'On Learning C, Part 3: C Programming Substance Guidelines'
categories:
- Computers
- Learning C
---

{% include on_learning_c.md number=3 %}

## C Programming Substance Guidelines

A few months ago, another C guide [was posted on Hacker News](https://news.ycombinator.com/item?id=10157018): [C Programming Substance Guidelines](https://github.com/btrask/stronglink/blob/master/SUBSTANCE.md). I disagreed with some of its recommendations, including the endorsement of Shaw's *Learn C the Hard Way*, so I left a comment on the HN submission. In hindsight, I see that my comment was too dismissive and curt. Fortunately, the author didn't take it personally. In fact, he was interested in a more detailed critique. That's the purpose of this post.

What follows is a sort of shotgun approach. I've quoted and responded to the guidelines that I think are particularly important to follow (or not follow). And in some cases, I present a more nuanced version of the author's advice, so as to diffuse some ways in which it could backfire. Alright, on with the show…


### Codebase Size

> Things that are large and frequently changing will **never** be secure.
> If you care about security, the best thing you can do is keep the project small.

This is great advice. It applies to all bugs, not just security issues. After a half-century of research into software development, the best predictor of a codebases's bug count is still lines of code.<sup>[\[1\]](#ref_1)</sup> Be warned though, [it is very hard to keep a codebase small]({% post_url 2013-03-06-the-cost-of-features %}).


### Setting Pointers to `NULL` After `free()`

> Immediately clear pointers after freeing…

I think this advice is dangerously double-edged. It really depends on what you're doing. If you intend to reuse the pointer, definitely set it to `NULL` after `free()`ing. In that case, the pointer serves as both a pointer and as a flag for related parts of the program's control flow. I recommend this pattern as it makes it very hard to get into an invalid state. Either the pointer points to a valid object, or it's `NULL`.

On the other hand: If you intend for the pointer to be allocated and deallocated only once, clearing it just hides bugs. If your program's control flow has unexpected behavior that results in a double-free, it's important to find out why that's happening. Papering over it with `ptr = NULL;` will fix the symptom, but it won't fix the underlying cause.


### `calloc()` vs. `malloc()`

> Use `calloc` instead of `malloc`

I don't think this matters much, but I mildly disagree. Like the previous example, this will likely hide the underlying cause of bugs in your program. If an issue is "fixed" by `calloc()`, that means something wasn't properly initialized. Zeroing-out the entire memory region might be the correct way to initialize it, or it might not. It really depends on what you're doing. Instead of blindly zeroing-out everything, it's better to explicitly initialize memory to the values you want. Doing so will help you avoid a class of bugs that –while rare– are very subtle and pernicious.


### Custom Allocators

> Don't write custom allocators

I hardly ever come across these, but I certainly agree. Unless you *really* know what you're doing, a custom allocator will likely be buggy and slow. It will also make it harder for other programmers to understand your code. I've never needed to write my own allocator. If memory allocation/deallocation becomes a performance bottleneck, use an existing library such as [APR's memory pools](https://apr.apache.org/docs/apr/2.0/group__apr__pools.html).


### Braces

Several guidelines reference brace style:

> Single line if possible: `if(rc < 0) return rc;`

> Single line if possible: `if(X == rc) return Y;`

> Put one-statement conditionals on the same line as the condition

> `if(rc < 0) goto fail;`

I can't get behind that. Never omit braces. The reasoning behind this is straightforward: When changing a one-line conditional into a multi-line conditional, people occasionally forget to add braces. Often, a `goto` or `return` ends up always being taken. By always using braces, you make your programs immune to this entire class of bugs. It's a no-brainer. You're sacrificing subjective improvement in appearance for an objective improvement in correctness. I can't say it enough: Never omit braces.


### Error Handling

>- Error handling
>  - Do it, always, even in sample code  
...  
>    - Handle errors like everyone is watching

This seems needlessly paranoid. Both the "when" and "how" of error handling depend heavily on what you're doing. If your code is used (or can be used) in something important, then go wild checking return values. However, there are some errors that you should probably never try to handle. For example, according to the spec, `malloc()` will return `NULL` if it couldn't allocate the requested memory. In practice, it's practically useless to check the return value of `malloc()`. Modern operating systems will lie about having enough memory<sup>[\[2\]](#ref_2)</sup>, then [kill your process for accessing the "allocated" memory](https://www.kernel.org/doc/gorman/html/understand/understand016.html).

That said, C programs written by beginners tend to have issues with error handling. Often, they completely ignore errors and keep on truckin', causing them to crash in odd ways. A simple crash-and-burn check would do wonders. Something like:

{% highlight c %}
rv = do_something(&foo);
if (rv) {
  fprintf(stderr, "Error: %s\n", strerror(errno));
  exit(1);
}
{% endhighlight %}

(This assumes `do_something()` sets `errno`.)


## Conclusion

Overall, I think *C Programming Substance Guidelines* is helpful, but I can't point newbies to it without major caveats. A decent portion of its advice is double-edged or counterproductive. My initial thoughts are a good note to end on:

> Please don't blindly follow this guide. Explore other codebases (including the ones the author linked to). Talk to other programmers. Write your own projects, and get feedback from those who are more knowledgable.

> You might notice that this advice generalizes to every language. That's because C isn't special. If anything, the language itself is simpler than most. C has just had more time to accumulate cruft, both technical and cultural. So don't feel intimidated. Once you learn those bits of historical trivia, you'll be fine.


---

1. <span id="ref_1"></span>From [*Making Software: What Really Works, and Why We Believe It*](http://www.amazon.com/Making-Software-Really-Works-Believe-ebook/dp/B004D4YI6G/), Chapter 8 (by Israel Herraiz & Ahmed E. Hassan):

> For nonheader files, all the metrics show a high degree of correlation with lines of code. We accounted for the confounding effect of size, showing that the high correlation coefficients remain for different size ranges. In our opinion, there is a clear lesson from this study: syntactic complexity metrics cannot capture the whole picture of software complexity. Complexity metrics that are exclusively based on the structure of the program or the properties of the text (for example, redundancy, as Halstead’s metrics do), do not provide information on the amount of effort that is needed to comprehend a piece of code—or, at least, no more information than lines of code do.

2. <span id="ref_2"></span>From [the Linux `malloc` manpage](http://linux.die.net/man/3/malloc):

> By default, Linux follows an optimistic memory allocation strategy. This means that when `malloc()` returns non-`NULL` there is no guarantee that the memory really is available.
