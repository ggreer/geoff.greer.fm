---
date: '2013-03-10 00:58:29'
layout: post
status: publish
title: Random CSS Stupidity
categories:
- Computers
---

A few days ago, [Bjorn](http://bjorn.tipling.com/) showed me some weird CSS behavior: if you have a child element with margins and you set the parent's padding to zero, the child's margins will collapse. This is apparently part of the CSS spec. I thought it unlikely that browsers would implement arbitrary-precision decimal arithmetic for styling calculations, so I was curious to see how close I could set the padding to zero before browsers rounded down.

Assuming you have JavaScript enabled, you'll know the answer for your own browser below.

<div style="width: 37em; margin: 0 auto; font-size: 90%; line-height: 120%;">
  <div style="outline: 1px solid green; padding: 0px 10px;" id="stupid">
    <div style="outline: 1px solid brown; margin: 10px 0px;">
      I am a red div with <code>margin: 10px 0px;</code><br />
      My parent div is green. It has <code>padding: <span id="padding">0px 10px</span>;</code>
    </div>
  </div>
  <div style="outline: 1px solid green; padding: 1px 10px;">
    <div style="outline: 1px solid brown; margin: 10px 0px;">
      I am a red div with <code>margin: 10px 0px;</code><br />
      My parent div is green. It has <code>padding: 1px 10px;</code>
    </div>
  </div>
  <div id="result" style="padding: 1em;">
    JS hasn't run yet. Do you have JavaScript disabled? <code>:(</code>
  </div>
</div>
<script type="text/javascript">
var elem = document.getElementById("stupid");
var initial_height = elem.offsetHeight;
function binary_search(min, max, depth) {
  if (depth > 100) {
    document.getElementById("result").innerHTML = "Your browser’s pixel precision is " + max.toFixed(8) + " pixels or 1/" +  Math.round(1/max) + " of a pixel.";
    elem.style.padding = min + "px 10px";
    document.getElementById("padding").innerHTML = min + "px 10px";
    return true;
  }
  var mid = (min + max) / 2;
  elem.style.padding = mid + "px 10px";
  if (elem.offsetHeight > initial_height) {
    return binary_search(min, mid, depth + 1);
  } else {
    return binary_search(mid, max, depth + 1);
  }
}
binary_search(0, 1, 0);
</script>

Inspect the top green box (the div with id "stupid") using Web Inspector or Firebug or whatever. You'll notice the padding is close to zero, but not quite. Still, the div behaves as if its padding is zero.

The exact padding depends on your browser. Chrome's [Planck length](http://en.wikipedia.org/wiki/Planck_length) is 1/64th of a pixel. The reason for this is explained on [Webkit's LayoutUnit page](http://trac.webkit.org/wiki/LayoutUnit). Firefox uses about 1/120th of a pixel, but I have no idea why. Safari doesn't care about anything less than 0.99 pixels. This seems fitting for a browser made by Apple.

It shouldn't need mentioning, but do **not** use this for browser detection. Browser detection is bad, but there are many better ways to do it.
