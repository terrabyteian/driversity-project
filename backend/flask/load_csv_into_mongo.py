import csv
from os.path import expanduser,join
from pymongo import MongoClient

home = expanduser('~')
trips = join(home,'Driversity/trips.csv')
events = join(home,'Driversity/events.csv')
users = join(home,'Driversity/users.csv')

usersdict={}
tripsdict={}

# collect user information
with open(users,'rb') as dbfile:
    csvreader = csv.DictReader(dbfile)
    for row in csvreader:
        usersdict[row['id']]=row

# build a dict of trips keyed on the ID
# add an events array to be added to later on
# add the client name from the users dict
# change the user_id field to just user
with open(trips,'rb') as dbfile:
    csvreader = csv.DictReader(dbfile)
    for row in csvreader:
        row['events']=[]
        row['client']=usersdict[row['user_id']]['company_id']
        row['user'] = row.pop('user_id')
        tripsdict[row['id']]=row

# push events to the events array of each trip
with open(events,'rb') as dbfile:
    csvreader = csv.DictReader(dbfile)
    for row in csvreader:
        tripsdict[row['trip_id']]['events'].append(row)

# load each trip as a document into Mongo
# purge database first
client = MongoClient()
client.driversity.trips.delete_many({})
for id,doc in tripsdict.iteritems():
    client.driversity.trips.insert_one(doc)
