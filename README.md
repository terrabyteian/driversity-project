# driversity-project

### UPDATE 12/13

I've update the code to include the following features:

* Upon selecting a user/client you get the average score of that user
** This table is using Facebook's debut open-source React componet called fixed-data-table. It can ingest large sets of data but it will only render the contents that are currently on your screen. This means that, if a user has a  large number of trips, the DOM will not slow down as a result. 
* Upon selecting one of the user's trips you're given a map with the trip drawn out and notable events marked with a message
** This map uses the Google Maps API combined with an open-source maps component for React to render the Map. I'm using my personal Google API key to tap into this information.
* Next to the map you get some general information about the trip (how many times caught speeding/using phone etc.)

I had some deeper ideas about the actual analytics behind this data, but I feel the sample data combined with time frame was not enough to implement most of those things. I think a separate backend analytics engine would be ideal to provide more mathematically-heavy analysis of the information. Here are some of my ideas on these things:

* Seeing how often you brake hard/accelrate quickly is nice enough, but that information would be more useful dependent on the road and traffic conditions at the time. Perhaps it would be useful to tap into Google's traffic data to properly highlight this type of information on the map. 
* Seeing how often you speed is also nice for a general overview, but it would be more useful to show that information alongside the speed limit of the road in question. It's possible the SpeedThreshold is higher/lower than the speed limit, and seeing how much you go over that threshold might provide more useful insight. 
* In general, an analytics backend designed to parse event-driven data would be ideal for pushing useful information to the user. Splunk is one example of such a backend I've worked with in the past.

Here are a few general things I would've liked to improve upon with my current progress:

* The zoom level for the map is a static value right now, ideally this would be calculated on the fly based upon a combination of the distance driven and/or the max/min of northeast and soutwest points. A few formulas for calculating this value were available online in my research.
* Depending on the size of your screen, sometimes the Boostrap columns do not behave in a pretty way. This I would improve by tapping into the containerWidth of the columns and passing it down to the fixed-data-table and the map.
* A prettier dashboard view with some overall information about the dataset would be nice to see, in addition to the Client->User->Trip drilldown.

I had a great deal of fun making this app (especially getting to play around with the Google maps API on the second go-around). I'm glad you liked the full-stack docker build, I only recently (past few months) starting playing around with Docker and this is my first true full-stack deliverable deriving from one Dockerfile. I'm pretty happy with how it turned out :). Regardless of where we go from here, I'm definitely interested in your thoughts and opinions on what I've delivered so far. Thank you for the opportunity!

### Install Steps

This project serves as a containerized version of a full-stack app for Driversiti.

Steps to install:

1. Download this project's .zip on a Linux machine
2. With docker installed, `cd <project_dir>/dockerbuild/`
3. Drop the .csv files in this directory (I would have included them in the git pull, but instructions mentioned not to publish these files on a public repo)
3. `docker build --no-cache -t driversiti-project:latest .` (This will build an image for this project)
4. `docker run -p 8080:8080 -p 5000:5000 -d -i -t driversiti-project`
5. Navigate to your IP address at port 8080 in a browser

This docker image contains the following:

* node/npm/python/flask/pip installed
* an instance of mongo 
* a supervisord conf file that runs Flask, gulp, and mongo in the background upon running the container

My time this weekend was limited, so I tried to focus on delivering a fully-functional full-stack framework in Docker that could be built upon. The app itself performs very basic read operations on the Mongo database, with a few more days that would have been expanded (I will discuss my though processes on-site if we get there). 

Special thanks to https://github.com/swieder227/react-iso-bootstrap for an open-source bootstrap to build isomorphic apps.

Please excuse any time I accidentally misspell Driversiti as Driversity :)
