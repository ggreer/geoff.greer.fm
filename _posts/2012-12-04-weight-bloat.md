---
date: '2012-12-04 05:12:59'
layout: post
title: 'Weight Bloat'
published: true
categories:
- Computers
---

Here's a graph showing the weight of some car models over the years:

<div id="car_weight_chart_div" style="width: 100%; height: 500px;"> </div>

I've noticed this trend across many fields. The Boeing 737-100 first flew in 1968 and weighed 30 tons empty. A modern 737-900 is 44 tons.

Is this weight bloat a bad thing? Engineers don't add weight without a reason. Cars are *much* safer than they used to be. They're more comfortable. They have more features: air-conditioning, power steering, automatic transmissions, airbags. Likewise, a modern 737 carries more passengers and cargo. It can fly farther.

But it's still important to recognize that weight is a trade-off.

What about trade-offs in the opposite direction? What do you get if you remove features to save weight? Even with modern emissions and safety requirements, it's possible to build a car with the weight of a compact car from 30 years ago.

Something like the Lotus Elise.

Why am I talking about airframes and cars?

Here's another graph:

<div id="cloc_chart_div" style="width: 100%; height: 500px;"> </div>

Code bases get bigger. Worse, binaries get bigger.


As a model increases in weight, capabilities, and price, manufacturers often introduce a new low-end model. The Honda Civic used to be Honda's smallest car in the US market. A decade ago, they introduced the Fit. 


<script type="text/javascript" src="https://www.google.com/jsapi"> </script>
<script type="text/javascript">
// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawCharts);

function drawCharts() {
  var car_data = new google.visualization.DataTable();
  car_data.addColumn("date", "Year");
  car_data.addColumn("number", "Honda Civic");
  car_data.addColumn("number", "Toyota Corolla");
  car_data.addColumn("number", "Volkswagen Golf");
  car_data.addRows([
    [new Date(1973, 0, 1), 680, 730, 790],
    [new Date(1975, 0, 1), 680, 880, 790],
    [new Date(1980, 0, 1), 780, 855, 790],
    [new Date(1985, 0, 1), 825, 1047, 969],
    [new Date(1988, 0, 1), 924, 1086, 969],
    [new Date(1989, 0, 1), 973, 1086, 969],
    [new Date(1990, 0, 1), 1026, 1086, 969],
    [new Date(1991, 0, 1), 1026, 1086, 1020],
    [new Date(1992, 0, 1), 1031, 1086, 1020],
    [new Date(1993, 0, 1), 1031, 1052, 1020],
    [new Date(1994, 0, 1), 1049, 1052, 1020],
    [new Date(1995, 0, 1), 1049, 1095, 1020],
    [new Date(1996, 0, 1), 1052, 1095, 1020],
    [new Date(1997, 0, 1), 1075, 1095, 1020],
    [new Date(1998, 0, 1), 1060, 1095, 1020],
    [new Date(1999, 0, 1), 1060, 1095, 1256],
    [new Date(2000, 0, 1), 1060, 1095, 1256],
    [new Date(2001, 0, 1), 1098, 1095, 1256],
    [new Date(2002, 0, 1), 1098, 1135, 1256],
    [new Date(2005, 0, 1), 1144, 1135, 1323],
    [new Date(2006, 0, 1), 1144, 1300, 1323],
    [new Date(2012, 0, 1), 1243, 1300, 1346]
  ]);
  var car_options = {
                  'title':'Car Weights',
                  'fontSize': 20,
                  'backgroundColor': {
                    'fill': '#eef'
                  },
                  'chartArea': {
                    'left': '15%',
                    'width': '80%'
                  },
                  'legend': {
                    'position': 'top',
                    'textStyle': {
                      'fontSize': 14
                    }
                  },
                  'hAxis': {},
                  'vAxis': {
                    'gridlines': {
                      'count': 6
                    },
                    'minValue': 0,
                    'title': 'Kilograms'
                  },
                  'colors': [
                    '#43d',
                    '#396',
                    '#668'
                  ],
                  'width': "100%",
                  'height': 500
                };
  var car_chart = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'car_weight_chart_div',
    'options': car_options,
    'dataTable': car_data
  });
  car_chart.draw();

  var cloc_data = new google.visualization.DataTable();
  cloc_data.addColumn("date", "Year");
  cloc_data.addColumn("number", "Apache httpd");
  cloc_data.addRows([
    [new Date("Wed Nov 7 19:26:48 2012 +0000"), 151569],
    [new Date("Sun Oct 7 00:07:05 2012 +0000"), 151348],
    [new Date("Wed Sep 19 07:44:53 2012 +0000"), 149758],
    [new Date("Tue Aug 21 14:46:55 2012 +0000"), 149328],
    [new Date("Tue Aug 7 19:38:09 2012 +0000"), 149290],
    [new Date("Tue Jul 31 19:59:30 2012 +0000"), 149018],
    [new Date("Wed Jul 18 18:28:04 2012 +0000"), 148751],
    [new Date("Fri Jun 22 14:56:44 2012 +0000"), 148624],
    [new Date("Sat May 26 16:08:58 2012 +0000"), 148168],
    [new Date("Tue May 8 16:50:38 2012 +0000"), 148135],
    [new Date("Sat Apr 28 09:02:40 2012 +0000"), 148035],
    [new Date("Wed Apr 25 13:43:43 2012 +0000"), 148044],
    [new Date("Fri Apr 20 11:44:27 2012 +0000"), 148042],
    [new Date("Thu Apr 12 14:15:20 2012 +0000"), 148033],
    [new Date("Mon Apr 2 18:52:26 2012 +0000"), 147996],
    [new Date("Fri Mar 16 19:58:32 2012 +0000"), 147982],
    [new Date("Wed Feb 29 01:52:17 2012 +0000"), 147924],
    [new Date("Thu Feb 2 14:14:00 2012 +0000"), 147888],
    [new Date("Mon Jan 9 13:06:18 2012 +0000"), 147909],
    [new Date("Sat Dec 17 17:06:08 2011 +0000"), 146650],
    [new Date("Fri Dec 2 22:42:39 2011 +0000"), 146180],
    [new Date("Tue Nov 22 16:50:00 2011 +0000"), 145938],
    [new Date("Sun Nov 13 00:21:45 2011 +0000"), 145723],
    [new Date("Wed Nov 9 23:21:13 2011 +0000"), 141145],
    [new Date("Sun Oct 30 14:19:45 2011 +0000"), 140793],
    [new Date("Sun Oct 9 22:41:54 2011 +0000"), 138907],
    [new Date("Mon Sep 19 13:50:53 2011 +0000"), 138592],
    [new Date("Sun Sep 4 16:04:38 2011 +0000"), 138404],
    [new Date("Sun Aug 14 22:03:02 2011 +0000"), 138240],
    [new Date("Sat Jul 23 17:29:42 2011 +0000"), 137890],
    [new Date("Wed Jun 29 19:16:36 2011 +0000"), 138645],
    [new Date("Mon Jun 6 15:42:06 2011 +0000"), 138020],
    [new Date("Mon May 9 18:43:50 2011 +0000"), 136193],
    [new Date("Thu Apr 7 00:07:50 2011 +0000"), 135923],
    [new Date("Mon Mar 28 10:09:29 2011 +0000"), 135884],
    [new Date("Sat Mar 12 12:03:59 2011 +0000"), 135779],
    [new Date("Tue Feb 15 16:13:20 2011 +0000"), 135695],
    [new Date("Wed Feb 2 21:23:41 2011 +0000"), 135381],
    [new Date("Sat Jan 15 15:21:54 2011 +0000"), 134947],
    [new Date("Wed Jan 5 16:22:42 2011 +0000"), 134942],
    [new Date("Thu Dec 23 16:43:43 2010 +0000"), 134889],
    [new Date("Tue Dec 7 21:03:23 2010 +0000"), 134900],
    [new Date("Tue Nov 30 21:43:36 2010 +0000"), 134854],
    [new Date("Sat Nov 20 22:38:38 2010 +0000"), 134623],
    [new Date("Sun Nov 7 13:26:54 2010 +0000"), 134312],
    [new Date("Wed Nov 3 15:23:31 2010 +0000"), 133779],
    [new Date("Wed Oct 20 11:03:01 2010 +0000"), 133639],
    [new Date("Tue Oct 12 19:59:09 2010 +0000"), 133175],
    [new Date("Mon Sep 27 14:32:33 2010 +0000"), 131702],
    [new Date("Thu Sep 16 09:56:38 2010 +0000"), 131039],
    [new Date("Wed Aug 18 20:10:12 2010 +0000"), 130159],
    [new Date("Wed Jul 14 20:19:07 2010 +0000"), 130018],
    [new Date("Fri Jun 18 08:44:34 2010 +0000"), 129401],
    [new Date("Sat Jun 5 20:35:51 2010 +0000"), 129249],
    [new Date("Thu May 6 14:00:59 2010 +0000"), 129118],
    [new Date("Tue Apr 13 13:54:00 2010 +0000"), 129021],
    [new Date("Wed Mar 24 13:11:51 2010 +0000"), 128701],
    [new Date("Thu Mar 11 14:23:19 2010 +0000"), 128625],
    [new Date("Sat Feb 20 15:21:03 2010 +0000"), 128494],
    [new Date("Mon Feb 1 21:38:15 2010 +0000"), 128003],
    [new Date("Tue Dec 29 12:39:23 2009 +0000"), 127767],
    [new Date("Tue Nov 24 21:24:27 2009 +0000"), 127614],
    [new Date("Mon Nov 9 10:43:16 2009 +0000"), 127509],
    [new Date("Mon Nov 2 19:03:06 2009 +0000"), 127435],
    [new Date("Fri Oct 9 21:45:16 2009 +0000"), 126556],
    [new Date("Sun Sep 27 12:54:50 2009 +0000"), 125823],
    [new Date("Sun Sep 6 19:36:45 2009 +0000"), 125610],
    [new Date("Mon Jul 27 16:38:04 2009 +0000"), 124026],
    [new Date("Sat Jun 27 06:59:47 2009 +0000"), 123613],
    [new Date("Fri May 15 15:19:04 2009 +0000"), 123456],
    [new Date("Tue May 5 06:47:21 2009 +0000"), 123424],
    [new Date("Thu Apr 2 10:05:39 2009 +0000"), 122732],
    [new Date("Wed Mar 25 17:52:23 2009 +0000"), 128724],
    [new Date("Tue Feb 17 17:51:17 2009 +0000"), 128532],
    [new Date("Sun Jan 25 22:13:40 2009 +0000"), 127897],
    [new Date("Thu Jan 8 18:29:42 2009 +0000"), 127645],
    [new Date("Tue Dec 30 17:07:25 2008 +0000"), 128699],
    [new Date("Sun Dec 14 17:18:16 2008 +0000"), 127095],
    [new Date("Fri Dec 5 03:48:35 2008 +0000"), 125326],
    [new Date("Thu Nov 13 01:23:00 2008 +0000"), 147570],
    [new Date("Fri Oct 31 13:35:46 2008 +0000"), 148307],
    [new Date("Fri Oct 10 06:41:32 2008 +0000"), 147022],
    [new Date("Mon Aug 18 13:33:34 2008 +0000"), 143981],
    [new Date("Thu Jul 10 13:27:37 2008 +0000"), 143955],
    [new Date("Sat Jun 7 12:51:43 2008 +0000"), 143837],
    [new Date("Thu May 22 17:01:14 2008 +0000"), 143739],
    [new Date("Sat May 3 04:25:37 2008 +0000"), 143674],
    [new Date("Tue Apr 8 16:04:12 2008 +0000"), 142553],
    [new Date("Wed Apr 2 15:07:57 2008 +0000"), 140833],
    [new Date("Sun Mar 2 23:57:11 2008 +0000"), 140706],
    [new Date("Mon Feb 11 14:27:34 2008 +0000"), 140575],
    [new Date("Mon Dec 31 05:40:54 2007 +0000"), 140191],
    [new Date("Tue Dec 11 13:27:21 2007 +0000"), 139947],
    [new Date("Fri Nov 23 12:13:59 2007 +0000"), 139287],
    [new Date("Wed Oct 24 03:56:50 2007 +0000"), 138355],
    [new Date("Wed Sep 26 14:26:19 2007 +0000"), 138197],
    [new Date("Sun Sep 2 09:16:05 2007 +0000"), 138065],
    [new Date("Fri Aug 24 00:42:35 2007 +0000"), 137955],
    [new Date("Mon Aug 6 22:45:39 2007 +0000"), 137917],
    [new Date("Wed Jul 18 08:02:21 2007 +0000"), 137575],
    [new Date("Sun May 27 11:26:04 2007 +0000"), 137274],
    [new Date("Mon Mar 19 20:04:56 2007 +0000"), 137154],
    [new Date("Mon Dec 25 17:40:10 2006 +0000"), 137115],
    [new Date("Tue Nov 7 13:35:09 2006 +0000"), 136940],
    [new Date("Thu Sep 28 20:15:42 2006 +0000"), 136050],
    [new Date("Sat Jul 29 13:24:37 2006 +0000"), 135180],
    [new Date("Tue Jul 11 21:12:08 2006 +0000"), 134809],
    [new Date("Sat Jun 10 01:51:27 2006 +0000"), 134748],
    [new Date("Wed Apr 19 22:47:49 2006 +0000"), 134513],
    [new Date("Thu Mar 9 20:36:27 2006 +0000"), 134415],
    [new Date("Wed Jan 18 10:11:39 2006 +0000"), 134565],
    [new Date("Sun Dec 11 20:40:56 2005 +0000"), 133459],
    [new Date("Wed Nov 16 17:24:48 2005 +0000"), 133082],
    [new Date("Tue Oct 25 19:54:11 2005 +0000"), 132990],
    [new Date("Wed Oct 5 07:59:36 2005 +0000"), 132708],
    [new Date("Mon Sep 19 13:03:37 2005 +0000"), 132523],
    [new Date("Fri Aug 26 16:00:59 2005 +0000"), 132314],
    [new Date("Tue Aug 9 08:21:39 2005 +0000"), 132091],
    [new Date("Sat Jul 16 11:46:15 2005 +0000"), 132090],
    [new Date("Thu Jun 16 12:52:57 2005 +0000"), 131620],
    [new Date("Mon May 23 17:43:10 2005 +0000"), 131187],
    [new Date("Wed Apr 20 19:44:43 2005 +0000"), 130532],
    [new Date("Thu Mar 31 19:02:44 2005 +0000"), 130401],
    [new Date("Fri Feb 25 06:29:20 2005 +0000"), 130152],
    [new Date("Thu Feb 3 22:05:06 2005 +0000"), 130095],
    [new Date("Sat Jan 15 16:19:16 2005 +0000"), 129551],
    [new Date("Thu Dec 16 19:28:17 2004 +0000"), 129460],
    [new Date("Fri Dec 3 05:28:00 2004 +0000"), 129337],
    [new Date("Sat Nov 27 19:54:28 2004 +0000"), 129272],
    [new Date("Fri Nov 19 09:18:04 2004 +0000"), 108342],
    [new Date("Sun Oct 31 18:00:43 2004 +0000"), 107412],
    [new Date("Wed Oct 6 19:40:47 2004 +0000"), 107271],
    [new Date("Fri Sep 17 15:39:29 2004 +0000"), 107015],
    [new Date("Thu Sep 9 10:26:29 2004 +0000"), 106193],
    [new Date("Thu Aug 26 18:30:41 2004 +0000"), 106102],
    [new Date("Tue Aug 17 16:35:26 2004 +0000"), 104795],
    [new Date("Wed Aug 11 22:13:50 2004 +0000"), 104362],
    [new Date("Mon Jul 26 03:42:54 2004 +0000"), 103525],
    [new Date("Sat Jul 3 07:19:58 2004 +0000"), 103051],
    [new Date("Thu Jun 3 15:43:09 2004 +0000"), 102340],
    [new Date("Wed May 5 15:30:53 2004 +0000"), 102256],
    [new Date("Sun Apr 18 19:05:49 2004 +0000"), 102149],
    [new Date("Tue Mar 30 19:58:14 2004 +0000"), 101541],
    [new Date("Tue Mar 16 16:57:02 2004 +0000"), 101467],
    [new Date("Mon Mar 1 17:49:52 2004 +0000"), 101204],
    [new Date("Sun Feb 8 19:48:18 2004 +0000"), 101017],
    [new Date("Thu Jan 29 23:40:02 2004 +0000"), 101009],
    [new Date("Sat Jan 10 05:43:49 2004 +0000"), 100886],
    [new Date("Tue Dec 16 20:55:04 2003 +0000"), 100533],
    [new Date("Wed Nov 26 18:48:56 2003 +0000"), 100281],
    [new Date("Sun Nov 2 14:40:45 2003 +0000"), 101459],
    [new Date("Thu Sep 18 20:57:12 2003 +0000"), 101364],
    [new Date("Fri Aug 22 23:14:30 2003 +0000"), 101254],
    [new Date("Wed Jul 30 21:04:31 2003 +0000"), 101160],
    [new Date("Mon Jul 21 12:42:52 2003 +0000"), 101153],
    [new Date("Wed Jul 9 12:19:01 2003 +0000"), 101094],
    [new Date("Tue Jun 10 20:17:51 2003 +0000"), 100984],
    [new Date("Thu May 22 12:25:19 2003 +0000"), 100914],
    [new Date("Tue May 13 14:52:37 2003 +0000"), 100672],
    [new Date("Wed Apr 23 18:58:17 2003 +0000"), 100754],
    [new Date("Wed Apr 9 21:58:52 2003 +0000"), 100717],
    [new Date("Sat Mar 29 02:18:43 2003 +0000"), 100827],
    [new Date("Thu Mar 6 21:57:45 2003 +0000"), 100577],
    [new Date("Tue Feb 18 22:07:21 2003 +0000"), 100071],
    [new Date("Wed Jan 29 18:26:43 2003 +0000"), 99814],
    [new Date("Thu Jan 16 23:23:47 2003 +0000"), 99612],
    [new Date("Sun Dec 29 03:36:57 2002 +0000"), 98418],
    [new Date("Sat Dec 14 19:00:34 2002 +0000"), 98474],
    [new Date("Mon Dec 2 23:56:25 2002 +0000"), 98130],
    [new Date("Wed Nov 20 21:43:24 2002 +0000"), 98053],
    [new Date("Mon Nov 11 03:13:54 2002 +0000"), 97866],
    [new Date("Fri Nov 1 17:55:12 2002 +0000"), 97723],
    [new Date("Fri Oct 18 16:47:29 2002 +0000"), 97616],
    [new Date("Wed Oct 9 01:40:44 2002 +0000"), 97473],
    [new Date("Mon Sep 30 23:43:18 2002 +0000"), 97372],
    [new Date("Fri Sep 20 06:06:41 2002 +0000"), 97237],
    [new Date("Sat Sep 14 23:05:42 2002 +0000"), 97189],
    [new Date("Sun Sep 8 22:45:05 2002 +0000"), 96696],
    [new Date("Mon Sep 2 00:24:44 2002 +0000"), 96589],
    [new Date("Sat Aug 24 17:54:20 2002 +0000"), 96466],
    [new Date("Fri Aug 16 03:52:53 2002 +0000"), 96326],
    [new Date("Fri Aug 2 03:42:12 2002 +0000"), 96318],
    [new Date("Thu Jul 25 17:11:33 2002 +0000"), 96162],
    [new Date("Wed Jul 17 07:14:59 2002 +0000"), 96060],
    [new Date("Wed Jul 10 07:01:02 2002 +0000"), 96061],
    [new Date("Fri Jun 28 08:40:25 2002 +0000"), 95915],
    [new Date("Wed Jun 19 00:31:12 2002 +0000"), 95471],
    [new Date("Thu Jun 13 18:37:00 2002 +0000"), 95386],
    [new Date("Fri Jun 7 10:33:33 2002 +0000"), 95313],
    [new Date("Sun Jun 2 02:27:07 2002 +0000"), 94848],
    [new Date("Wed May 29 21:14:21 2002 +0000"), 94206],
    [new Date("Fri May 24 14:41:08 2002 +0000"), 93926],
    [new Date("Fri May 17 10:48:06 2002 +0000"), 93679],
    [new Date("Fri May 10 07:51:16 2002 +0000"), 93435],
    [new Date("Fri May 3 20:13:57 2002 +0000"), 93115],
    [new Date("Sun Apr 28 01:45:00 2002 +0000"), 93003],
    [new Date("Fri Apr 19 20:57:01 2002 +0000"), 92724],
    [new Date("Fri Apr 12 19:58:52 2002 +0000"), 91012],
    [new Date("Fri Apr 5 21:24:13 2002 +0000"), 89507],
    [new Date("Mon Apr 1 08:27:42 2002 +0000"), 89398],
    [new Date("Thu Mar 28 02:36:05 2002 +0000"), 89368],
    [new Date("Mon Mar 25 07:37:34 2002 +0000"), 89316],
    [new Date("Wed Mar 20 01:58:47 2002 +0000"), 88303],
    [new Date("Thu Mar 14 07:21:10 2002 +0000"), 87990],
    [new Date("Tue Mar 12 01:40:02 2002 +0000"), 88071],
    [new Date("Thu Mar 7 09:27:17 2002 +0000"), 87518],
    [new Date("Fri Mar 1 09:23:05 2002 +0000"), 87411],
    [new Date("Sun Feb 24 00:34:14 2002 +0000"), 87149],
    [new Date("Sun Feb 17 19:21:31 2002 +0000"), 86780],
    [new Date("Mon Feb 11 15:40:07 2002 +0000"), 86599],
    [new Date("Tue Feb 5 23:17:22 2002 +0000"), 86363],
    [new Date("Fri Feb 1 17:57:43 2002 +0000"), 85756],
    [new Date("Tue Jan 29 15:31:28 2002 +0000"), 85648],
    [new Date("Tue Jan 22 06:26:07 2002 +0000"), 85424],
    [new Date("Sat Jan 12 02:43:31 2002 +0000"), 85302],
    [new Date("Thu Jan 3 09:53:37 2002 +0000"), 85679],
    [new Date("Thu Dec 27 06:03:13 2001 +0000"), 85292],
    [new Date("Fri Dec 14 13:42:17 2001 +0000"), 84702],
    [new Date("Wed Dec 5 19:01:25 2001 +0000"), 84513],
    [new Date("Wed Nov 28 07:11:44 2001 +0000"), 84478],
    [new Date("Wed Nov 21 18:08:33 2001 +0000"), 83653],
    [new Date("Tue Nov 13 20:15:10 2001 +0000"), 84668],
    [new Date("Thu Nov 8 14:29:37 2001 +0000"), 84314],
    [new Date("Mon Oct 29 15:45:53 2001 +0000"), 83669],
    [new Date("Thu Oct 18 19:51:49 2001 +0000"), 83111],
    [new Date("Thu Oct 11 13:27:05 2001 +0000"), 82216],
    [new Date("Wed Oct 3 01:18:22 2001 +0000"), 82181],
    [new Date("Sat Sep 22 18:53:20 2001 +0000"), 82110],
    [new Date("Mon Sep 10 04:21:40 2001 +0000"), 82599],
    [new Date("Fri Aug 31 09:47:53 2001 +0000"), 82248],
    [new Date("Sun Aug 26 20:09:52 2001 +0000"), 82161],
    [new Date("Thu Aug 23 21:03:44 2001 +0000"), 82287],
    [new Date("Wed Aug 22 02:22:46 2001 +0000"), 83141],
    [new Date("Sun Aug 19 05:48:19 2001 +0000"), 83081],
    [new Date("Thu Aug 16 16:51:48 2001 +0000"), 80635],
    [new Date("Thu Aug 9 15:56:20 2001 +0000"), 80764],
    [new Date("Fri Aug 3 16:25:10 2001 +0000"), 79107],
    [new Date("Mon Jul 30 05:02:53 2001 +0000"), 78885],
    [new Date("Mon Jul 23 18:17:16 2001 +0000"), 77531],
    [new Date("Wed Jul 11 14:48:23 2001 +0000"), 77084],
    [new Date("Wed Jun 27 21:14:15 2001 +0000"), 76881],
    [new Date("Sat Jun 9 02:57:46 2001 +0000"), 76508],
    [new Date("Wed May 23 03:39:44 2001 +0000"), 76473],
    [new Date("Fri May 11 18:21:27 2001 +0000"), 76218],
    [new Date("Fri May 4 00:01:18 2001 +0000"), 66008],
    [new Date("Thu Apr 19 12:07:50 2001 +0000"), 65943],
    [new Date("Tue Apr 10 20:28:01 2001 +0000"), 65328],
    [new Date("Tue Apr 3 06:01:49 2001 +0000"), 65436],
    [new Date("Wed Mar 21 02:20:00 2001 +0000"), 65075],
    [new Date("Fri Mar 2 21:36:21 2001 +0000"), 72643],
    [new Date("Fri Feb 23 13:16:51 2001 +0000"), 73097],
    [new Date("Wed Feb 14 13:35:05 2001 +0000"), 73189],
    [new Date("Sat Feb 10 03:03:18 2001 +0000"), 73721],
    [new Date("Thu Feb 1 15:58:09 2001 +0000"), 73844],
    [new Date("Thu Jan 25 02:51:30 2001 +0000"), 73677],
    [new Date("Thu Jan 18 19:42:15 2001 +0000"), 74684],
    [new Date("Sun Jan 7 16:37:12 2001 +0000"), 74777],
    [new Date("Thu Dec 21 19:47:51 2000 +0000"), 74582],
    [new Date("Sun Dec 17 03:08:43 2000 +0000"), 74496],
    [new Date("Thu Dec 7 08:56:17 2000 +0000"), 74597],
    [new Date("Sat Dec 2 21:39:03 2000 +0000"), 74609],
    [new Date("Thu Nov 23 10:08:19 2000 +0000"), 73826],
    [new Date("Wed Nov 15 20:44:50 2000 +0000"), 73074],
    [new Date("Thu Nov 9 03:33:24 2000 +0000"), 71525],
    [new Date("Wed Nov 1 00:08:33 2000 +0000"), 71474],
    [new Date("Sat Oct 21 12:15:32 2000 +0000"), 70499],
    [new Date("Fri Oct 13 17:36:51 2000 +0000"), 70534],
    [new Date("Sun Oct 8 06:05:22 2000 +0000"), 70441],
    [new Date("Thu Sep 28 17:05:36 2000 +0000"), 69718],
    [new Date("Wed Sep 13 02:07:40 2000 +0000"), 69575],
    [new Date("Sat Aug 19 00:38:51 2000 +0000"), 69147],
    [new Date("Tue Aug 8 04:59:31 2000 +0000"), 68794],
    [new Date("Sat Jul 29 14:30:29 2000 +0000"), 68641],
    [new Date("Tue Jul 11 22:12:18 2000 +0000"), 66993],
    [new Date("Fri Jun 30 14:45:15 2000 +0000"), 67062],
    [new Date("Tue Jun 20 11:31:54 2000 +0000"), 58810],
    [new Date("Sun Jun 11 22:35:20 2000 +0000"), 58768],
    [new Date("Sun Jun 4 19:27:02 2000 +0000"), 59259],
    [new Date("Wed May 24 23:45:37 2000 +0000"), 58556],
    [new Date("Thu May 11 20:34:29 2000 +0000"), 58367],
    [new Date("Fri Apr 28 05:50:17 2000 +0000"), 53949],
    [new Date("Mon Apr 17 13:45:42 2000 +0000"), 53686],
    [new Date("Fri Mar 31 06:42:48 2000 +0000"), 53950],
    [new Date("Tue Mar 14 12:18:28 2000 +0000"), 53528],
    [new Date("Thu Feb 10 16:38:57 2000 +0000"), 54063],
    [new Date("Tue Jan 4 19:01:04 2000 +0000"), 54054],
    [new Date("Wed Dec 8 22:34:02 1999 +0000"), 54196],
    [new Date("Wed Nov 3 02:38:42 1999 +0000"), 53231],
    [new Date("Tue Oct 12 20:36:56 1999 +0000"), 53242],
    [new Date("Mon Aug 30 14:47:21 1999 +0000"), 51943],
    [new Date("Sun Aug 15 00:15:44 1999 +0000"), 27116],
    [new Date("Mon Jul 12 22:51:15 1999 +0000"), 26719],
    [new Date("Tue Mar 23 14:35:47 1999 +0000"), 25644],
    [new Date("Wed Nov 4 19:31:50 1998 +0000"), 24837],
    [new Date("Mon Jun 22 09:48:38 1998 +0000"), 23552],
    [new Date("Sat Mar 21 17:00:54 1998 +0000"), 21605],
    [new Date("Tue Nov 25 09:47:47 1997 +0000"), 17750],
    [new Date("Wed Jul 30 20:08:17 1997 +0000"), 13689],
    [new Date("Fri May 30 19:33:04 1997 +0000"), 10891],
    [new Date("Wed Apr 16 12:43:20 1997 +0000"), 9929],
    [new Date("Sun Jan 26 01:31:14 1997 +0000"), 7917],
    [new Date("Tue Nov 26 06:02:02 1996 +0000"), 5668],
  ]);
  var cloc_options = {
                  'title':'Lines of Code',
                  'fontSize': 20,
                  'backgroundColor': {
                    'fill': '#eef'
                  },
                  'chartArea': {
                    'left': '15%',
                    'width': '80%'
                  },
                  'legend': {
                    'position': 'top',
                    'textStyle': {
                      'fontSize': 14
                    }
                  },
                  'hAxis': {},
                  'vAxis': {
                    'gridlines': {
                      'count': 6
                    },
                    'minValue': 0,
                    'title': 'Lines'
                  },
                  'colors': [
                    '#43d',
                    '#396',
                    '#668'
                  ],
                  'width': "100%",
                  'height': 500
                };
  var cloc_chart = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'cloc_chart_div',
    'options': cloc_options,
    'dataTable': cloc_data
  });
  cloc_chart.draw();
}
</script>
