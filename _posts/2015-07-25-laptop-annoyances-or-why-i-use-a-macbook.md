---
date: '2015-07-25 14:04:40'
layout: post
slug: laptop-annoyances-or-why-i-use-a-macbook
published: true
title: 'Laptop Annoyances (Or: Why I Use a MacBook)'
categories:
- Computers
- Laptops
---

When asked why I use macs, I reply with something along the lines of, "Because macs don't annoy me as much as other laptops." That response is immediately followed by a request for examples. If this conversation is face-to-face, I boggle for a moment. There are so *many* examples. I have trouble enumerating them. For future reference, I've taken the time to list and explain these common annoyances.

In the infintesimal chance that a Lenovo exec reads this: Please consider it a list of things to verify before shipping a new model.

### Table of Contents
- [Trackpad](#trackpad)
- [Keyboard](#keyboard)
- [Screen](#screen)
- [Battery life](#battery)
- [Size](#size)
- [Suspend/Hibernate](#suspend)
- [Fans](#fans)
- [Drivers](#drivers)
- [Other minor gripes](#other)


---
<span id="trackpad"></span>

## Trackpad

I sometimes wonder if laptop makers are controlled by a cabal of mouse manufacturers. Why else would so many companies churn out glitchy, barely-usable trackpads? It's the only explanation that makes sense: Make terrible trackpads so more people buy external mice. The alternative is that laptop makers are incompetent, and they can't *all* be incompetent, right?

Out of all the annoyances I run into, this is the most common. My 2014 ThinkPad's trackpad is inferior to the one on my *2005* iBook. Almost a decade separates the two machines, yet the newer one has a smaller, glitchier, worse-feeling trackpad. It's absurd.

There's no secret formula for a good trackpad. Make it big. Make it glass. Make decent drivers. Outside of Apple gear, few models satisfy even one of those three.

I long for the day when the only laptop users with mice are either gamers or psychotics. Judging from the current state of things, I doubt that day will ever come.


---
<span id="keyboard"></span>

## Keyboard

<a href="/photos/pics/DSC_0662.jpg"><img alt="ThinkPad x140e keyboard" src="/photos/pics/thumbs/DSC_0662.jpg" /></a>

If you ever find yourself agreeing with the statement, "PrintScreen should go between Ctrl and Alt.", put down the bottle of Kirkland Signature™ Absinthe and go to bed.

Given how important keyboards are at melding mind and machine, it makes sense that laptop makers would spend some R&D money on them. As far as I can tell, they are spending that money on novel ways to *ruin* keyboards. Apple experiments with a lot of new technologies, but one thing they hardly ever mess with is the keyboard. Macs don't have "innovative" new layouts. They don't have fancy "smart" function keys. They're just normal keyboards. The reason for this is straightforward: If it ain't broke, don't fix it.


---
<span id="screen"></span>

## Screen

<a href="/photos/pics/retina_screen.jpg"><img alt="MacBook Air vs Retina MacBook" src="/photos/pics/thumbs/retina_screen.jpg" style="width:400px; height:350px; float:left; padding-right:16px;" /></a>

Skimping on a screen is like buying cheap glasses. Yes, you will save money. And you'll be annoyed by your frugality for thousands of hours afterwards. On the flip side, a high-resolution [IPS](https://en.wikipedia.org/wiki/IPS_panel) display is a continual joy to use.

When the retina MacBook Pros came out, I avoided looking at their screens. I heard they were gorgeous, and I didn't want to be tempted into getting something larger and heavier. Now the 12" MacBook is out and my suspicion is confirmed: Once you use a nice screen, you can't go back. Everything else looks blurry, blocky, and washed-out.


---
<span id="battery"></span>

## Battery life

<a href="/photos/screenshots/Screen Shot 2015-08-03 at 00.17.16.png"><img alt="My MacBook's battery usage" src="/photos/screenshots/thumbs/Screen Shot 2015-08-03 at 00.17.16.png" style="width:400px; height:262px; float:left; padding-right:16px;" /></a>

It may sound like a lot, but most people need at least 9 hours of battery life. For software developers, that number is closer to 12. Let me explain.

No sane person has ever said, "I wish this laptop's battery didn't last so long." Still, an astonishing fraction of laptops have terrible battery life. Below some threshold, battery logistics are a constant distraction. Carry a charger. Search for a seat near an outlet. Dim the screen. Close apps. Monitor battery percentage like it's the blood pressure of a trauma patient.

Longer battery life is liberating. Once it reaches a certain threshold, you just plug in at night and stop worrying. After experiencing this, it's impossible to go back.


---
<span id="size"></span>

## Size

Most laptops are far larger than they need to be. Apple's largest laptop is the 15" MacBook Pro. Compared to a lot of stuff out there, it's positively miniscule.

<a href="/photos/pics/IMG_1241.jpg"><img alt="My MacBook next to an UltraBook" src="/photos/pics/thumbs/IMG_1241.jpg" /></a>

Look at this UltraBook™®© next to my 12" MacBook. It's ultra-huge. Sure, most people *could* carry it around, but few would *want* to. Bigger laptops are more likely to be left at home. That's a problem, since (to borrow a photography aphorism) the best computer is the one you have with you.


---
<span id="suspend"></span>

## Suspend/Hibernate

Like trackpads, this is another simple aspect of laptops that almost everyone gets wrong. Here is how suspend and hibernate should work:

- When the lid closes, the laptop suspends to RAM. In this mode, it consumes <1% battery per hour.

- When the lid *starts to open*, the laptop resumes. The screen is on and ready for input before the user can finish opening the lid.

- If the laptop is open but sleeping (often due to idle), hitting any key or clicking the trackpad will resume it. The screen should be on and ready to work within a second.

Bonus points if Bluetooth input devices can wake the laptop from sleep.

In the past decade, the *only* laptops that have satisfied these criteria have been made by Apple. Others take multiple seconds to wake, or they consume 5% battery per hour, or they're only woken by lid-opening, not hitting keys. Phones and tablets never seem to have issues with suspend/hibernate, so I find it bizarre that laptops do.


---
<span id="fans"></span>

## Fans

Except for [high-end low-power designs]({% post_url 2015-04-19-2015-macbook-review %}), laptop fans are still a necessity. The easy part of laptop cooling is blowing air across a heatsink. The difficulty comes in designing something that works on all surfaces (including blankets) without distracting or annoying the user.

It seems counterintuitive, but the only good location for ventilation is the hinge. Every other place has signifiacant disadvantages. Vents on the base can be blocked by blankets or bedding, causing overheating. Side vents blow hot air on things next to the laptop; usually resting hands. Front vents direct noise at the user and require long ducts, eating up space for the battery. In contrast, hinge vents can't be blocked. They direct fan noise away from the user, and they don't require long ducts.

Another common fan annoyance results from poorly-written control firmware. Many laptops run their fans at a few discrete speeds. These discrete changes are noticed much more readily than continuously varied fans. It may seem minor, but this distraction adds up over the life of the laptop.


---
<span id="drivers"></span>

## Drivers

Even the best hardware can be ruined by bad drivers. I would love to run Ubuntu on a Surface Pro, but the experience would be hell if it lacked decent drivers for the trackpad, camera, microphone, Bluetooth, WiFi, power saving, screen brightness, headphone switching, and a half-dozen other things that are only noticed when they're broken.

This stuff isn't rocket science. No new technology needs to be invented. It just comes down to high standards and attention to detail.


---
<span id="other"></span>

## Other minor gripes

- No SSD. Today, any laptop sold without one is a defective laptop. While spinning rust is cheaper and can store more, it is orders of magnitude slower than a modern SSD.

- Build quality. Cheap plastic is a deal breaker. Lightweight alloys of aluminum or magnesium are ideal.

- LEDs. The only thing worse than an always-on LED is a constantly blinking LED. Double penalty if it's one of those insanely bright blue LEDs. You might as well have a laptop that comes with an automatic eye-poking machine.

- Camera. The camera must be centered above the screen. Any other position will make for weird shots. Occasionally, I'll see a model with the camera near the hinge. That's great if you want to look up someone's nose while video chatting. When it comes to the actual camera hardware, resolution doesn't matter much, but low-light performance is important.

- Microphone placement is crucial. It must be away from noise-generating hardware such as the keyboard and fans. Ideally, the laptop can have multiple mics and use software or firmware to filter noise. Apple has dual-mic technology in all of their laptops. My ThinkPad x140e's microphone is in the palm rest, making it all but useless.

---

It's because I have such low tolerance for these annoyances that I keep coming back to Apple. Some Apple models miss the mark, but I have yet to find any non-Apple laptop that gets these right.

If you've found something else that you're happy with, great. I really am happy for you. But don't disparage mac owners for being sheep. There are a lot of details that Apple reliably gets right.
