---
date: '2012-09-10 18:18:50'
layout: post
title: 'Adding Pthreads to Ag'
published: true
categories:
- Computers
- the_silver_searcher
---

In my quest to make Ag as fast as possible, I spent some time making it multi-threaded. This meant learning [Pthreads](http://en.wikipedia.org/wiki/POSIX_Threads), which was easier than I expected.

Although the Pthreads API isn't too hard to pick up, other architectural decisions took more effort to get right. My first attempt at multithreaded search was rather naïve. The plan was simple: For each file, create a new thread, search the file, then exit the thread. It didn't require a huge change in the code, but I also wasn't sure what kind of performance benefit I'd get. A typical run of Ag searches a lot of files, and spawning a thread for each file could incur some significant overhead. I figured it was worth a shot. It wasn't long before I had things working, but my initial results were discouraging.

{% highlight text %}
% time ./ag blahblahblah ~/code
...
./ag blahblahblah ~/code  2.18s user 20.91s system 152% cpu 15.134 total
%
{% endhighlight %}

15 seconds? That's 7x slower than non-threaded Ag! I broke out the profiler.

[![](/images/ag_profile_thread_per_file.png)](/images/ag_profile_thread_per_file.png)

Creating a new thread isn't free. I knew there was overhead, and now I knew how much. Apparently, it's not very efficient to search 60,000 files by creating and destroying 60,000 threads. 

Next I tried a different model: [Worker threads](http://en.wikipedia.org/wiki/Thread_pool_pattern). 

{% highlight text %}
% time ./ag blahblahblah ~/code
...
./ag blahblahblah ~/code  1.47s user 2.54s system 231% cpu 1.731 total
%
{% endhighlight %}

That's better, but it's only 0.3 seconds faster than non-threaded Ag. Searching files is [embarrassingly parallel](http://en.wikipedia.org/wiki/Embarrassingly_parallel). I must be doing something wrong if I'm only getting a 15% performance improvement.


Tweaking the number of worker threads significantly affected performance. I assumed 3-4 workers would be ideal, but I wanted to make sure I was getting the best performance.

<div id="chart_div" style="width: 100%; height: 500px;"> </div>

For comparison: non-threaded Ag takes 2.0 seconds.

There are a couple of quick takeaways from this graph.

First, OS X *sucks* at this benchmark. With 16 workers, the performance is pitiful. I had to remove the 32 thread results from the graph, as they made it hard to see the difference in performance with fewer threads. On average, OS X took 8.5 seconds to search with 32 threads. That's just shameful. On the other hand, the Linux kernel seems to get things right. Even with 32 workers, it took 2.2 seconds.

Second, the optimal number of worker threads doesn't seem to correlate with CPU cores. Even on a quad-core CPU, performance was best with two workers. I want to figure out why this is the case, but for now I'm simply going to accept it and tweak Ag for performance.

I think I'm getting pretty close to the maximum possible searching speed. Take a look at the current profiling info:

[![](/images/ag_profile_thread_workers.png)](/images/ag_profile_thread_workers.png)

There's no bottleneck. All the time is spent doing things that simply must be done. Open files, read data, match, close files. 

{% highlight text %}
% time du -sh ~/code
5.8G	/Users/ggreer/code
du -sh ~/code  0.09s user 1.42s system 95% cpu 1.572 total
%
{% endhighlight %}

That's right, my benchmark data set is 5.8 gigabytes. Ag doesn't actually search through the whole 5.8 gigabytes in 1.4 seconds. The total amount of data searched is around 400MB. Still, I'm surprised that it's faster than `du`.

I think this project is starting to wrap up. Now that I've gotten things as fast as I can, most changes will be feature requests and bug fixes. It was a fun journey. I learned a lot of things about a lot of things, and I'm sure I'll use that knowledge elsewhere.

<script type="text/javascript" src="https://www.google.com/jsapi"> </script>
<script type="text/javascript">
// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Worker threads");
  data.addColumn("number", "OS X 10.8, Core i7 3667U@2.0Ghz");
  data.addColumn("number", "Ubuntu 12.04, Core 2 Duo E3200@3.2Ghz");
  data.addRows([
    ["1",  1.536, 1.419],
    ["2",  1.392, 1.358],
    ["3",  1.471, 1.848],
    ["4",  1.767, 1.894],
    ["8",  2.677, 2.025],
    ["16", 4.713, 2.066]
  ]);
  // Set chart options
  var options = {
                  'title':'Ag worker thread benchmark',
                  'fontSize': 20,
                  'backgroundColor': {
                    'fill': '#eef'
                  },
                  'chartArea': {
                    'left': '10%',
                    'width': '85%'
                  },
                  'legend': {
                    'position': 'top',
                    'textStyle': {
                      'fontSize': 14
                    }
                  },
                  'hAxis': {
                    'title': 'Worker threads'
                  },
                  'vAxis': {
                    'gridlines': {
                      'count': 6
                    },
                    'minValue': 0,
                    'title': 'Seconds'
                  },
                  'width': "100%",
                  'height': 500
                };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ChartWrapper({
    'chartType': 'ColumnChart',
    'containerId': 'chart_div',
    'options': options,
    'dataTable': data
  });
  chart.draw();
}
</script>
