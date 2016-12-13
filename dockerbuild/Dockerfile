# Driversiti Project Dockerfile

# Base Image
FROM ubuntu:16.04

# Install requirements
RUN \
	apt-get update && \
	apt-get -y upgrade && \
	apt-get install -y build-essential && \
	apt-get install -y software-properties-common && \
	apt-get install -y curl git vim wget unzip python-pip

# Install mongo
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep DISTRIB_CODENAME | cut -d= -f2)/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update && apt-get install -y mongodb-org
RUN mkdir -p /data/db

# Install node/gulp
RUN apt-get install -y nodejs && ln -s /usr/bin/nodejs /usr/bin/node
RUN apt-get install -y npm
RUN npm install -g gulp-cli

# Install Supervisor to run multiple services
RUN apt-get update && apt-get install -y openssh-server apache2 supervisor
RUN mkdir -p /var/lock/apache2 /var/run/apache2 /var/run/sshd /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy over the CSV files
RUN mkdir -p /root/Driversity
COPY users.csv /root/Driversity/users.csv
COPY events.csv /root/Driversity/events.csv
COPY trips.csv /root/Driversity/trips.csv

# Install the code and set up flask/node
RUN cd /opt && wget https://github.com/terrabyteian/driversity-project/archive/master.zip
RUN cd /opt && unzip master.zip
RUN cd /opt/driversity-project-master/frontend/ && npm install
RUN cd /opt/driversity-project-master/frontend/node_modules/react-gmaps/ && wget https://github.com/tristandb/react-gmaps/archive/master.zip && unzip master.zip && cp -r react-gmaps-master/dist .
RUN cd /opt/driversity-project-master/backend/flask && pip install -r requirements.txt
RUN mongod --fork --logpath /var/log/mongod.log && cd /opt/driversity-project-master/backend && python load_csv_into_mongo.py

# expose frontend and start up supervisor
EXPOSE 5000 8080
CMD ["/usr/bin/supervisord"]
