from flask import Flask, jsonify, request, render_template
from flask_pymongo import PyMongo
import os 
import json

def init_database():
    application = Flask(__name__)
    application.config["MONGO_URI"] = 'mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE']
    # connect to mongodb server
    mongo = PyMongo(application)
    # asign database
    db = mongo.db

    youtubeSongIndex = {
        "sequence_value": -1,
        "playNowIndex": 0,
        "isContinue": True,
        "isStopState": 0,
        "nowProgress": 0,
        "playListIndex": -1,
        "songLength": 0,
    }

    youtubeSongList = [
        {
        }
    ]

    songListPage = [
        {
        }
    ]

    collection = db.youtubeSongIndex
    result = collection.remove({})
    result = collection.insert(youtubeSongIndex)

    collection = db.youtubeSongList
    result = collection.remove({})
    result = collection.insert(youtubeSongList)

    collection = db.songListPage
    result = collection.remove({})
    result = collection.insert(songListPage)