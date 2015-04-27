---
date: '2015-04-26 10:37:19'
layout: post
slug: os-x-code-signing-and-firewalls
published: true
title: 'OS X: Code Signing and Firewalls'
categories:
  - Computers
---

A few days ago, I encountered a new annoyance. Every time I launched an [io.js](https://iojs.org) server on my dev laptop, OS X's firewall prompted me:

<div style="display: flex; justify-content: center;">
  <img style="height: 290px; width: 532px;" src="/photos/screenshots/Screen Shot 2015-04-26 at 11.34.49.png" />
</div>

This was odd. Typically, such prompts are only seen the first time a new binary is executed. It's expected after building a new version of io.js, but upgrading to v1.8.1 seemed to have changed this behavior. I checked my firewall rules and confirmed that io.js was explicitly allowed.

<img style="height: 654px; width: 780px" src="/photos/screenshots/Screen Shot 2015-04-26 at 12.11.13.png" />

Confused? So was I. Why would OS X keep prompting for an allowed program? I needed to get work done, so rather than understand the problem, I tried to quickly fix it. Restarting didn't help. Uninstalling and rebuilding io.js didn't change anything. I finally stumbled on a clue when I attempted to remove and re-add the firewall rule. I could remove io.js, but I couldn't re-add it. Clicking "allow" when prompted didn't add it. Even manually adding `/usr/local/bin/iojs` did nothing.

Poking around eventually paid off. I manually verified the code signature...

{% highlight bash %}
ggreer@carbon:~% codesign -vv /usr/local/bin/iojs
/usr/local/bin/iojs: invalid signature (code or signature have been modified)
{% endhighlight %}

Not good! But I had work to do. I couldn't spend time satisfying my curiosity. As a band-aid, I simply signed the current binary.

{% highlight bash %}
ggreer@carbon:~% sudo codesign -f -s - /usr/local/bin/iojs
/usr/local/bin/iojs: replacing existing signature
{% endhighlight %}

That was enough to tide me over until the weekend, but I wasn't pleased at the prospect of doing this whenever I upgraded io.js. Also, I still had no idea how a program compiled on my own laptop could have an invalid signature.

Yesterday evening, I dove into the problem. First, I reinstalled io.js to reproduce the firewall prompting issue. Then I tried to figure out where things were going wrong. What follows is my thought process interspersed with terminal output.

<br />

Idea: Maybe my dev environment is borked. Let's try compiling other programs to see if they pass signature checks.

{% highlight bash %}
ggreer@carbon:~% codesign -vv /usr/local/bin/ag       
/usr/local/bin/ag: code object is not signed at all
{% endhighlight %}

Ag's build process lacks any signing steps, so that seems fine. Searching through io.js's build scripts, I notice some steps that could potentially try to sign the binary. What about something with a similar build process to io.js? Would building Node.js result in an invalid signature?

{% highlight bash %}
ggreer@carbon:~/Downloads/node-v0.12.2% codesign -vv out/Release/node
out/Release/node: code object is not signed at all
{% endhighlight %}

Hmm... nope. In fact, it's not signed at all. What's different here? Also, how exactly is io.js's signature invalid? After looking at `codesign`'s manpage again, I use `--describe`:

{% highlight bash %}
ggreer@carbon:~% codesign -dv /usr/local/bin/iojs
Executable=/usr/local/bin/iojs
Identifier=iojs-5555494426c029279ed5393a9c5c43ac9796d090
Format=Mach-O thin (x86_64)
CodeDirectory v=20100 size=79954 flags=0x2(adhoc) hashes=3991+2 location=system
Signature=adhoc
Info.plist=not bound
TeamIdentifier=not set
Sealed Resources=none
Internal requirements count=0 size=12
{% endhighlight %}

Interesting info, but nothing really stands out to me. Maybe running `codesign` with `dtruss` can help me figure out how OS X verifies the signature:

{% highlight bash %}
ggreer@carbon:~% sudo dtruss -f -t open codesign -dv /usr/local/bin/iojs 
...
  PID/THRD  SYSCALL(args)      = return
 8507/0x1e707:  open("/usr/lib/dtrace/libdtrace_dyld.dylib\0", 0x0, 0x0)     = 3 0
 8507/0x1e707:  open("/dev/dtracehelper\0", 0x2, 0x102F51000)    = 3 0
 8507/0x1e707:  open("/usr/local/bin/iojs\0", 0x0, 0x1B6)    = 3 0
 8507/0x1e707:  open("/usr/local/bin/iojs\0", 0x0, 0x1B6)    = 4 0
{% endhighlight %}

Nothing?! I could have sworn OS X had a database of code signatures somewhere. `codesign` should have opened it. In desperation, I search my entire hard drive for that unique-looking identifier: `5555494426c029279ed5393a9c5c43ac9796d090`.

{% highlight bash %}
ggreer@carbon:~% sudo ag --depth -1 -u 5555494426c029279ed5393a9c5c43ac9796d090 \
/Applications /Library /System /Users /private /usr 2>/dev/null
Binary file /private/var/db/DetachedSignatures matches.
{% endhighlight %}

Success! Opening the file in a text editor shews binary stuff interspersed with text. Hopefully, `file` can figure it out.

{% highlight bash %}
ggreer@carbon:~% file /private/var/db/DetachedSignatures
/private/var/db/DetachedSignatures: SQLite 3.x database
{% endhighlight %}

Good ol' `file`, you never let me down. Except when you do. I'm relieved it's a a SQLite DB,but what sort of horrid schema lurks in that file?

{% highlight sql %}
ggreer@carbon:~% sudo sqlite3 /private/var/db/DetachedSignatures  
SQLite version 3.8.5 2014-08-15 22:37:57
Enter ".help" for usage hints.
sqlite> .tables
code    global
sqlite> .schema code
CREATE TABLE code ( 
    id integer primary key on conflict replace autoincrement not null, 
    global integer null references global (id), 
    identifier text not null, 
    architecture integer, 
    identification blob not null unique on conflict replace, 
    signature blob not null, 
    created text default current_timestamp 
  );
CREATE INDEX identifier_index on code (identifier);
CREATE INDEX architecture_index on code (architecture);
CREATE INDEX id_index on code (identification);
sqlite> .schema global
CREATE TABLE global ( 
    id integer primary key on conflict replace autoincrement not null, 
    sign_location text not null, 
    signature blob null 
  );
CREATE INDEX location_index on global (sign_location);
{% endhighlight %}

Fortunately, the schema is pretty simple. That `identifier` in the `code` table looks promising. I bet it's got something io.js-related.

{% highlight sql %}
sqlite> SELECT * FROM code WHERE identifier LIKE "%iojs%";
2|2|iojs-555549445f8d6c1f2ea53e118856306c27a3e609|16777223|UUID_?l.?>?V0l'??  |??
   ?|2015-04-16 18:45:36
4|4|iojs-5555494426c029279ed5393a9c5c43ac9796d090|16777223|UUID&?)'??9:?\C???А|??
   ?|2015-04-21 22:40:24
sqlite> 
{% endhighlight %}

Bingo. The table contains my band-aid signature *and* one from a week earlier. Though we shouldn't be too hasty to stop gathering information. Is there anything important in the `global` table?

{% highlight sql %}
sqlite> SELECT * FROM global WHERE id IN (SELECT global FROM code WHERE identifier LIKE "%iojs%");
2|/usr/local/bin/iojs|??
                        ?
4|/usr/local/bin/iojs|??
                        ?
{% endhighlight %}

No, but it was worth checking.

Now a hypothesis emerges. I'm still not sure how, but *somehow* an older version of io.js was signed on April 16th. When I upgraded, that signature was no longer valid. The second signature in the DB was created when I manually signed the binary. Not wanting to go further down this rabbit hole, I delete the signatures, restart my computer, and see if I'm back to normal behavior:

{% highlight sql %}
sqlite> DELETE FROM global WHERE id IN (SELECT global FROM code WHERE identifier LIKE "%iojs%");
sqlite> DELETE FROM code WHERE identifier LIKE "%iojs%";
{% endhighlight %}

{% highlight bash%}
ggreer@carbon:~% codesign -vv /usr/local/bin/iojs
/usr/local/bin/iojs: code object is not signed at all
{% endhighlight %}

Victory! As expected, OS X's firewall only prompts me once. After the first run, `codesign` is happy:

{% highlight bash%}
ggreer@carbon:~% codesign -vv /usr/local/bin/iojs
/usr/local/bin/iojs: valid on disk
/usr/local/bin/iojs: satisfies its Designated Requirement
{% endhighlight %}

I want to know why my old iojs signature failed, but I couldn't find many clues from April 16th. That was just after I'd gotten [my new laptop]({% post_url 2015-04-19-2015-macbook-review %}), but before I enabled Time Machine (April 21<sup>st</sup>).
