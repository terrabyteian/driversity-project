# driversity-project

This project serves as a containerized version of a full-stack app for Driversiti.

Steps to install:

1. Download this project's .zip on a Linux machine
2. With docker installed, `cd <project_dir>/dockerbuild/`
3. Drop the .csv files in this directory (I would have included them in the git pull, but instructions mentioned not to publish these files on a public repo)
3. `docker build --no-cache -t driversiti-project:latest .` (This will build an image for this project)
4. `docker run -p 8080:8080 -p 5000:5000 -d -i -t driversiti-project`
5. Navigate to your IP address at port 8080 in a browser (If you are running docker on OSX, get the IP address of your docker VM by using `docker-machine ip`)

This docker image contains the following:

* node/npm/python/flask/pip installed
* an instance of mongo 
* a supervisord conf file that runs Flask, gulp, and mongo in the background upon running the container

My time this weekend was limited, so I tried to focus on delivering a fully-functional full-stack framework in Docker that could be built upon. The app itself performs very basic read operations on the Mongo database, with a few more days that would have been expanded (I will discuss my though processes on-site if we get there). 

Special thanks to https://github.com/swieder227/react-iso-bootstrap for an open-source bootstrap to build isomorphic apps.

Please excuse any time I accidentally misspell Driversiti as Driversity :)
