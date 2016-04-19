---
date: '2016-01-18 22:26:52'
layout: post
slug: on-learning-c-part-2-zed-shaws-learn-c-the-hard-way
published: true
title: "On Learning C, Part 2: Zed Shaw's Learn C the Hard Way"
categories:
- Computers
- Learning C
---

{% include on_learning_c.md number=2 %}

Another common answer to, "What book should I read to learn C?", is [Zed Shaw](https://en.wikipedia.org/wiki/Zed_Shaw)'s [*Learn C the Hard Way*](http://c.learncodethehardway.org/book/), AKA "LCTHW."

## Learn C the Hard Way: A Flawed Text with an Agenda

As harsh as that title may sound, I'm really not trying to court controversy. I have no grudge with Zed Shaw. In fact, I think he's a talented programmer and an excellent teacher. He has helped thousands of people with his guide, [*Learn Python the Hard way*](http://learnpythonthehardway.org/). He has done far more to advance programming education than I could ever hope to. It is for these reasons that I wish I could say, "*Learn C the Hard Way* is worth reading." Unfortunately, it's not.

I'm not alone in this view. The most well-known (though in my opinion, flawed) criticism of LCTHW is [Learn C the Wrong way](http://hentenaar.com/dont-learn-c-the-wrong-way) by Tim Hentenaar. While snarky and hostile, it does contain valid criticisms. The chapter on setup is quite poor. The chapter on invoking the compiler is atrocious. It only talks of `make`, not directly invoking `gcc` or `clang`. In essence, it pretends there is only one way to invoke the compiler: a build system, and only one build system: `make`. I'm all for introductory texts keeping things simple, but that's going too far. I could list dozens of other problems, but it would be a duplication of Hentenaar's efforts. In short, there's no salvaging this book.

If I could distill my evaluation of LCTHW to one sentence, it would be: Shaw fundamentally disagrees with the majority of C programmers about how to write C. The biggest divergence comes from his condemnation of NULL-terminated strings. Originally, LCTHW had [an introductory chapter "critiquing" K&R](https://web.archive.org/web/20141030032654/http://c.learncodethehardway.org/book/krcritique.html). Much of the chapter boils down to: If you don't NULL-terminate something that's supposed to be NULL-terminated, all kinds of terrible things can happen. I'm not sure who this warning is intended for. Anyone who writes C will quickly have this knowledge burned into their brain. When it comes to details, Shaw's critique is full of mistakes. Instead of listing them all, I'll just link to the times it has been discussed on Hacker News: [1](https://news.ycombinator.com/item?id=3448573), [2](https://news.ycombinator.com/item?id=4095294), [3](https://news.ycombinator.com/item?id=5012432), [4](https://news.ycombinator.com/item?id=8833965). Take a look at [Shaw's replies](https://news.ycombinator.com/item?id=8834896). They make my case far better than I could.


## Shaw's Response

Shaw eventually received enough criticism that he [admitted defeat and removed the K&R chapter](https://zedshaw.com/2015/01/04/admitting-defeat-on-kr-in-lcthw/). In that blog post, he went on to disparage the entire C community and the language itself:

> But C? C’s dead. It’s the language for old programmers who want to debate section A.6.2 paragraph 4 of the undefined behavior of pointers. Good riddance. I’m going to go learn Go.

[Shaw's response to Tim Hentenaar](https://zedshaw.com/2015/09/28/taking-down-tim-hentenaar/) had the same tact and grace. Honestly, I find Shaw's response baffling. He spends very few words addressing technical arguments. Most of the post is Shaw saying good things about himself and bad things about Tim Hentenaar. Tim lacks qualifications. Tim doesn't understand how to teach code. Tim is arrogant. Tim is hubristic. Tim can't spell. Those may all be true, but they don't address the arguments. Yes, Tim is a snarky prick, but that doesn't make his arguments incorrect.

There's only one criticism that Shaw really addresses, and that's Hentenaar's defense of NULL-terminated strings. Shaw shows how Hentenaar's `copy()` could fail… if the source string is corrupted. As I read this part of Shaw's post, I was reminded of a quote by Charles Babbage:

> On two occasions I have been asked, "Pray, Mr. Babbage, if you put into the machine wrong figures, will the right answers come out?" ... I am not able rightly to apprehend the kind of confusion of ideas that could provoke such a question.<sup>[\[1\]](#ref_1)</sup> 

If you're willing to posit corrupt or invalid inputs to a function, all bets are off. No data structure will save you. Amusingly, Shaw's original criticism of Hentenaar's `copy()` was incorrect. On the one technical issue Shaw engaged with, he was mistaken. Someone else had to correct him. That's quite the indictment of his C knowledge. If Shaw can't correctly refute one C example, what are the chances he's written a quality book on the language?


## Why I'm Writing this

I have no dog in this fight. I just don't want newbies to be misinformed.<sup>[\[2\]](#ref_2)</sup> As I said before, Zed Shaw's guides have helped thousands. But when it comes to C, he is both mistaken and more than a little arrogant. I truly wish it were otherwise.


---

1. <span id="ref_1"></span>[Passages from the Life of a Philosopher](https://archive.org/details/passagesfromlif01babbgoog)

2. <span id="ref_2"></span>In fact, I knew nothing about LCTHW or this spat until [someone asked for "peer reviews"](https://www.reddit.com/r/C_Programming/comments/3rd4dg/peer_review_learn_c_the_hard_way_by_zed_shaw_pub/) of LCTHW in [/r/C_Programming](https://www.reddit.com/r/C_Programming).
