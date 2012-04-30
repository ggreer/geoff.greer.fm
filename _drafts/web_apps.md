typical structure of web apps

front-end html/js/css to make data look pretty and provide UI
...does xhrs to...
web servers running django/rails/whatever. purpose is to expose clean interfaces to the data
...does SQL requests to...
sql database

the whole goal here is to build a nice UI that people can use to munge data

that set-up is pretty standard, but if you weren't used to it, wouldn't it look a little over-architected?
why not keep the UI & data in the same place?
  privacy
    sort of. but people don't share computers as much as they used to, and there's a lot of data that people don't care about

advantages:
  less surface area for attackers (have to penetrate browser storage instead of lowest-common-denominator web apps)
  cheaper

this is a little architecture astronauty. let me use a concrete example:

