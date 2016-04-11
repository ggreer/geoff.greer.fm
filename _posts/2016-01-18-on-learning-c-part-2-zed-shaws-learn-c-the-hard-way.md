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

Another common answer to, "What book should I read to learn C?", is [Zed Shaw's](https://en.wikipedia.org/wiki/Zed_Shaw)'s [*Learn C the Hard Way*](http://c.learncodethehardway.org/book/), AKA "LCTHW."


## Learn C the Hard Way: A Flawed Text with an Agenda

As harsh as that title may sound, I'm really not trying to court controversy. I have no grudge with Zed Shaw. In fact, I think he's a talented programmer and an excellent teacher. He has helped thousands of people with his guide, [*Learn Python the Hard way*](http://learnpythonthehardway.org/). He has done far more to advance programming education than I could ever hope to. It is for these reasons that I wish I didn't have to say: *Learn C the Hard Way* is not worth reading. Unfortunately, it's true.

I'm not alone in this view. The most well-known (though in my opinion, flawed) criticism of LCTHW is [Learn C the Wrong way](http://hentenaar.com/dont-learn-c-the-wrong-way) by Tim Hentenaar. While snarky and hostile, it does contain valid criticisms. The chapter on setup is quite poor. The chapter on invoking the compiler is atrocious. It only talks of `make`, not directly invoking `gcc` or `clang`. In essence, it pretends there is only one way to invoke the compiler: a build system, and only one build system: `make`. I'm all for introductory texts keeping things simple, but that's going too far.

If I could distill my evaluation of LCTHW to one sentence, it would be: Shaw fundamentally disagrees with the majority of C programmers about how to write C. The biggest divergence comes from his condemnation of NULL-terminated strings. Originally, LCTHW had [an introductory chapter "critiquing" K&R](https://web.archive.org/web/20141030032654/http://c.learncodethehardway.org/book/krcritique.html). Much of the chapter boils down to: If you don't NULL-terminate something that's supposed to be NULL-terminated, all kinds of terrible things can happen. This is not something you can avoid learning


## Shaw's Response

Shaw received enough criticism that he eventually [admitted defeat and removed the K&R chapter](https://zedshaw.com/2015/01/04/admitting-defeat-on-kr-in-lcthw/). In that blog post, he went on to disparage the entire C community and the language itself:

> But C? C’s dead. It’s the language for old programmers who want to debate section A.6.2 paragraph 4 of the undefined behavior of pointers. Good riddance. I’m going to go learn Go.

Shaw [responded to Tim Hentenaar](https://zedshaw.com/2015/09/28/taking-down-tim-hentenaar/) with the same grace and stoicism.


## I Have no Dog in this Fight

I knew nothing about LCTHW or this spat until [someone asked for "peer reviews"](https://www.reddit.com/r/C_Programming/comments/3rd4dg/peer_review_learn_c_the_hard_way_by_zed_shaw_pub/) in [/r/C_Programming](https://www.reddit.com/r/C_Programming).



---

> On two occasions I have been asked, "Pray, Mr. Babbage, if you put into the machine wrong figures, will the right answers come out?" ... I am not able rightly to apprehend the kind of confusion of ideas that could provoke such a question.

— Charles Babbage, [Passages from the Life of a Philosopher](https://archive.org/details/passagesfromlif01babbgoog)
