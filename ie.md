---
layout: page
title: The Case Against Internet Explorer
---

I’ve been working on adding IE support to Tectonic Console for the past few weeks. The more time I spend on this, the more I am convinced that supporting IE is a mistake.

## Why Tectonic Console Succeeded

When the Tectonic Console & OpenShift Console teams met, both sides agreed that the Tectonic Console should be the future. Despite having a much smaller team (2-3 developers), we built a competitive product. We accomplished this because we had a habit of saying “no” to large maintenance burdens. This made it much easier for us to improve the codebase, add features, and generally move faster. If we want to maintain anything resembling our past velocity, we must continue this practice.

## Internet Encumbrance

Supporting IE will be our largest maintenance burden, and a particularly morale-draining one at that. IE problems aren’t interesting or enjoyable to solve. Setting up automated testing for IE is so difficult that Matt and I have given up on it. Even if a QA team manually tested IE, support would be a pain. IE’s developer tools pale in comparison to modern browsers, making debugging difficult. Any workarounds will create extra code paths throughout the codebase, increasing the rate of software rot. Some of IE’s shortcomings can’t be worked around. Supporting IE means no HTTP2, no new TLS, no WebRTC, broken Flexbox, broken WebSockets, broken CSS, and more. We’d basically have to freeze our technology stack to 2013.

These problems will only get worse over time. Firefox, Chrome, Edge, and Safari all continue to improve. Every month they add support for new standards. Every month the gulf between IE and modern browsers widens. Microsoft promises to support IE for the next seven years. Seven years is a long time for browsers to accumulate features. To give you some idea of how much change is possible: seven years ago, browsers did not have WebSockets, CSS3, Flexbox, HTML5, fetch(), TLS 1.2, HSTS, sandboxed iframes, Content Security Policy, WebGL, WebAudio, or WebRTC. [This table](https://caniuse.com/#compare=chrome+9,chrome+68) shows how much has changed.

## Solution

If a customer insists on using an old browser that receives no bug fixes or features, we provide old software that receives no bug fixes or features. That is: leave them with the original OpenShift Console. Don’t add support for new Kubernetes resource types. Don’t fix bugs. Only provide security updates. Treat them the way Microsoft treats IE.
