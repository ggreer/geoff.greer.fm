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

> Things that are large and frequently changing will **never** be secure.
> If you care about security, the best thing you can do is keep the project small.

This is great advice. It applies to all bugs, not just security issues. After a half-century of research into software development, the best predictor of a codebases's bug count is still lines of code.<sup>[\[1\]](#ref_1)</sup>

> Immediately clear pointers after freeing…

I think this advice is dangerously double-edged. It really depends on what you're doing. If you intend to reuse the pointer, definitely set it to `NULL` after `free()`ing. In that case, the pointer serves as both a pointer and as a flag for related parts of the program's control flow. I recommend this pattern as it makes it very hard to get into an invalid state. Either the pointer points to a valid object, or it's `NULL`.

On the other hand: If you intend for the pointer to be allocated and deallocated only once, clearing it just hides bugs. If your program's control flow has unexpected behavior that results in a double-free, it's important to find out why that's happening. Papering over it with `ptr = NULL;` will fix the symptom, but it won't fix the underlying cause.

> Use `calloc` instead of `malloc`

I don't think this matters much, but I mildly disagree.

> Don't write custom allocators

I hardly ever come across these, but I certainly agree. Unless you *really* know what you're doing, a custom allocator is likely to be buggy and slow. It will also make it harder for other programmers to understand your code. I've never needed to write my own allocator. If memory allocation/deallocation becomes a performance bottleneck, use an existing memory pool library.


> Single line if possible: if(rc < 0) return rc;
> Single line if possible: if(X == rc) return Y;
> Put one-statement conditionals on the same line as the condition
> if(rc < 0) goto fail;

If you always use braces, you will make yourself immune to an entire class of bugs.

> Use an assertion macro that accepts a format string

This is


---

1. <span id="ref_1"></span>From [*Making Software: What Really Works, and Why We Believe It*](http://www.amazon.com/Making-Software-Really-Works-Believe-ebook/dp/B004D4YI6G/), Chapter 8 (by Israel Herraiz & Ahmed E. Hassan):

> For nonheader files, all the metrics show a high degree of correlation with lines of code. We accounted for the confounding effect of size, showing that the high correlation coefficients remain for different size ranges. In our opinion, there is a clear lesson from this study: syntactic complexity metrics cannot capture the whole picture of software complexity. Complexity metrics that are exclusively based on the structure of the program or the properties of the text (for example, redundancy, as Halstead’s metrics do), do not provide information on the amount of effort that is needed to comprehend a piece of code—or, at least, no more information than lines of code do.

