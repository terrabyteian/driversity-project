import flask
from flask import Flask
from pymongo import MongoClient
import json
from bson import ObjectId
from bson.json_util import dumps

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
client = MongoClient() 
db = client.driversity

"""
Custom JSON Encoder
This is required to handle BSON encoded mongo objects (such as ObjectID)
"""
class CustomEncoder(json.JSONEncoder):
    def default(self,o):
        if isinstance(o,ObjectId):
            return str(o)
        return json.JSONEncoder.default(self,o)

def custom_dumps(data):
    return CustomEncoder().encode(data)

"""
    Getting all unique clients
    Input: None
    Output:
    [
        <client 1>,
        ...
    ]
"""
@app.route('/clients')
def get_clients():
    return flask.jsonify(db.trips.find({}).distinct('client'))

"""
    Get all users by client
    Input: client (as url param)
    Output:
    [
        <user1>,
        ...
    ]
"""
@app.route('/users/<client_id>')
def get_users(client_id):
    return flask.jsonify(db.trips.find({'client':client_id}).distinct('user'))

"""
    Get all trips by user
    Input: client (as url param)
    Output:
    [
        {
            Keys: _id, start_time,end_time,start_time_local,end_time_local,duration
        },
        ...
    ]
"""
@app.route('/trips/<user_id>')
def get_trips(user_id):
    cursor = db.trips.find({'user':user_id},{'events':0,'client':0,'id':0,'user':0})
    docs = []
    for doc in cursor:
        docs.append(doc)
    return custom_dumps(docs)

@app.route('/events/<trip_id>')
def get_events(trip_id):
    cursor = db.trips.find({'_id':ObjectId(trip_id)})
    docs = []
    for doc in cursor:
        return custom_dumps(doc['events'])

if __name__ == "__main__":
    app.run(host='0.0.0.0')
