---
date: '2012-12-05 05:12:59'
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
}
</script>
