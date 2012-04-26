
This past week has been a journey to Mordor. I found a bug in a program, found a bug in the test suite for that program, then a bug in node.js, then a bug in V8. 

bug in gutsy: tests failing

try to debug tests, whiskey debugger crashes when I backtrace
whiskey debugger is a modified version of \_debugger.js from node.js 0.4
decide to fix the whiskey debugger
run into some issues with ctrl+c killing the debugger instead of exiting the REPL
figure out that node isn't handling/forwarding signals 
create issue https://github.com/joyent/node/issues/3167
dude responds that it's partially a V8 bug

As Crockford says, programmers have something wrong with them. Any sane person would write one program and vow to never do it again. Programmers seem to forget how terrible programming is
(find the real quote)


I think there has to be something seriously wrong with you in order to do this work. A normal person, once they've looked into the abyss, will say, "I'm done. This is stupid. I'm going to do something else." But not us, 'cause there's something really wrong with us.

