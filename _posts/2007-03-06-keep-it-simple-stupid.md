---
date: '2007-03-06 11:55:08'
layout: post
slug: keep-it-simple-stupid
status: publish
title: Keep it simple, stupid.
wordpress_id: '12'
categories:
- Computers
---

I was asked to write a linked list in C++ at a job interview today. Immediately I started working on classes and methods and whatnot, but I didn't have enough time to get it fully working. I gave a poor impression and had to explain inserting into and deleting from linked lists on paper. Afterwards, I realized my interviewer didn't want a heavy object-oriented linked list. He wanted to make sure I knew the concept (and pointers in C++). A simple struct node and a couple of loops would have done the job.


When I got home, I was compelled to finish what I started. I made the linked list anyway to prove to myself I could do it. [Here's](/code/linkedlist.tar.gz) the Xcode project and everything else that's necessary. Obviously you don't need Xcode. Compiling main.cpp should do the trick on pretty much any system. 


The linked list only has an AddToFront, DeleteFromFront, Next, and GoBackToFront methods, since that's about all you can do with a singly linked list. I used templates so the thing could actually be useful if not for the total lack of documentation and testing. (Not to mention the fact that everyone writes one of these.) It does have an educational purpose though: Since I made it spit output when nodes are added and deleted, you can see how the destructor is implicitly called once the test object is out of scope. (In this case it's when the program ends.) Writing this really took me back to my data structures class. I guess I've become soft since most languages come with nice data structures.
