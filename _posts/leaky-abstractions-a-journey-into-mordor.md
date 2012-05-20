
Since I got back [from vacation](/2012/03/19/japan-trip/), I've been writing JavaScript at work. My first week was a journey to Mordor. I found a bug in a program, then found a bug in the test suite for that program, then found a bug in node.js, which was caused by a bug in [V8](http://code.google.com/p/v8/).

I'll start at the beginning. I was 
bug in [gutsy](https://github.com/racker/gutsy): tests failing

try to debug tests, whiskey debugger crashes when I backtrace
whiskey debugger is a modified version of \_debugger.js from node.js 0.4
decide to fix the whiskey debugger
run into some issues with ctrl+c killing the debugger instead of exiting the REPL
figure out that node isn't handling/forwarding signals 
create issue https://github.com/joyent/node/issues/3167
dude responds that it's partially a V8 bug http://code.google.com/p/v8/issues/detail?id=2098

As [Crockford](http://www.crockford.com/) says:

>I think there has to be something seriously wrong with you in order to do this work. A normal person, once they've looked into the abyss, will say, "I'm done. This is stupid. I'm going to do something else." But not us, 'cause there's something really wrong with us.

Programmers have something wrong with them. Any sane person would write one program and vow to never do it again. Programmers seem to forget how terrible programming is.

I don't recall encountering a leakier abstraction than this. I'm just glad the issue didn't go any deeper. The next step would have been an operating system bug, then a hardware bug, then a bug in physics.
