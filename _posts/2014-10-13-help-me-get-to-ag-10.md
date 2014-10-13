---
date: '2014-10-13 07:39:37'
layout: post
slug: help-me-get-to-ag-10
published: true
title: Help Me Get to Ag 1.0
categories:
  - Computers
  - the_silver_searcher
---

[My work](https://floobits.com/) has resulted in me neglecting [Ag](/ag/) for the past 18 months. There have been bug fixes, a few new features, and some contributions by users. But one pernicious class of issues remain: Ignore patterns aren't obeyed correctly.

This is by far the most-reported class of issues. There are a few reasons why they persist:

1. I don't use many types of ignore patterns in my own repos.
2. Correctly parsing patterns requires complicated code.
3. Adding accurate ignore behavior will make Ag slower. In typical usage, Ag already spends more time figuring out which files to search than time actually searching files.
4. Some patterns are inherently slow. I don't want users to blame Ag when the true cause is their own ignore rules.

Recently, I paired with [Theo Spears](https://github.com/theospears) to [fix](https://github.com/ggreer/the_silver_searcher/pull/501/files) some of the ignore pattern issues. Theo has a sharp mind and a great personality. Together, we were able to make significant progress on ignores. Hopefully our schedules will allow us to collaborate in the future. Theo was also kind enough to triage many duplicate issues, which I have been slowly closing.

There's only one other issue I want to fix before tagging a 1.0 release: `--context` [doesn't work when searching pipes](https://github.com/ggreer/the_silver_searcher/issues/347). Once that's taken care of, I think most future additions will be tests and bug fixes.

If I had to bet on Ag 1.0's release date, I would say January. My real work consumes me. Any time I spend on Ag is time I don't spend working on Floobits. Progress on Ag happens when others want to pair with me, since that also gives me a chance to get feedback about Floobits.

<span id="invitation"></span>
To that end, I extend an invitation: If you know C and want to pair on Ag, let me know<sup>[\[1\]](#ref_1)</sup>. It's fine if you don't live in San Francisco. [Floobits](https://floobits.com/) makes it possible to pair from anywhere, so long as one has the bandwidth for video chat.

---

1. <span id="ref_1"></span> {% include contact.md %}
