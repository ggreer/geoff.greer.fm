---
date: '2009-05-18 02:54:49'
layout: post
slug: geoip-impostor
status: publish
title: GeoIP Impostor
wordpress_id: '286'
categories:
- Computers
---

A big selling point of the Internet is that it allows worldwide communication. Lately though, I've noticed more sites using [IP geolocation](http://en.wikipedia.org/wiki/Geolocation_software) to restrict access. I'm in the United States so my beef is with [BBC iPlayer](http://www.bbc.co.uk/iplayer/), but most people outside America can't use [Hulu](http://www.hulu.com/), [Netflix](http://www.netflix.com/), or [Joost](http://www.joost.com/). At best, content available in other countries is a small subset of that in the US. A while ago, I got the idea of creating a service to allow people to get around these restrictions. 

Here's how it works: VPN servers are set up in different countries using virtualization providers like EC2. This allows a new VM with a different IP to be quickly spawned if a host is blocked. Clients sign up for the service and download an OpenVPN config (or an OpenVPN client bundled with the config). They connect to a VPN server in the country they want to pretend they're from. All traffic goes over the VPN, so the client is effectively an impostor.

Of course VPNs have many uses besides GeoIP evasion. You can safely use public WiFi, circumvent censorship in your home country, or test for localized outages. Many VPN providers exist, but I haven't found any that advertise the ability to circumvent GeoIP. Most importantly, VPN providers usually offer either a single exit point or no way to choose the exit point. 

Anyway, I've set up OpenVPN servers in the US and EU on EC2. An exit point in the UK is coming soon. The site is [Mpostr](http://mpostr.com/). The signup page is behind HTTP auth. Contact me via comment, e-mail, IM, IRC, whatever if you want a free alpha account.

Oh, and I would love recommendations for a decent VM provider in the UK.


