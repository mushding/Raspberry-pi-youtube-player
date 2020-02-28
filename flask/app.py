# <---- import session ---->
# import flask
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import requests

# for youtube player
import os
import subprocess
import time
import json

# import omxplayer 
from init_omxplayer import Omx

# import youtube downloader
import youtube_dl

# import mongodb
from init_database import init_database
from flask_pymongo import PyMongo
from bson import BSON
from bson import json_util


# <---- initail flask session ---->
# initail flask
application = Flask(__name__)
application.config["MONGO_URI"] = 'mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE']
CORS(application)

# <---- initial mongodb server ---->
# initail database
init_database()
# connect to mongodb server
mongo = PyMongo(application)
# asign database
db = mongo.db
# initial omxplayer
omx = Omx()
omx.init()

# get home pwd
homepath = str(os.getcwd())

# Youtube Player
# <----- user press top button area ----->
# replay playing now
@application.route('/replayYoutubeDLList', methods=['GET'])
def replayYoutubeDLList():
	omx.pause()
	result = db.youtubeSongIndex.find_one_and_update({'isStopState': {'$exists': True}}, {"$set": {"isStopState": 0}})
	return "play sound successfully"

# pause playing now
@application.route('/pauseYoutubeDLList', methods=['GET'])
def pauseYoutubeDLList():
	omx.pause()
	result = db.youtubeSongIndex.find_one_and_update({'isStopState': {'$exists': True}}, {"$set": {"isStopState": 1}})
	return "pause sound successfully"

# stop playing now
@application.route('/stopYoutubeDLList', methods=['GET'])
def stopYoutubeDLList():
	omx.stop()
	result = db.youtubeSongIndex.find_one_and_update({'isStopState': {'$exists': True}}, {"$set": {"isStopState": 2}})
	return "stop sound successfully"

# Stop Continue
@application.route('/stopContinue', methods=['GET'])
def stopContinue():
	result = db.youtubeSongIndex.find_one_and_update({'isContinue': {'$exists': True}}, {"$set": {"isContinue": False}})
	result = json.loads(json_util.dumps(result))
	return "set successfully"

# Start Continue
@application.route('/startContinue', methods=['GET'])
def startContinue():
	result = db.youtubeSongIndex.find_one_and_update({'isContinue': {'$exists': True}}, {"$set": {"isContinue": True}})
	result = json.loads(json_util.dumps(result))
	return "set successfully"

# Change Volume
@application.route('/changeVolume/<int:setVolume>', methods=['GET'])
def changeVolume(setVolume):
	if setVolume == 0:
		volume = -0.2
		omx.set_volume(volume)
	elif setVolume == 1:
		volume = 0.2
		omx.set_volume(volume)
	elif setVolume == 2:
		volume = 0
		omx.set_volume(volume)
	return "change successfully"

# delete all song file
@application.route('/deleteAllSong', methods=['GET'])
def deleteAllSong():
	result = db.youtubeSongIndex.find({'sequence_value': {'$exists': True}})
	result = json.loads(json_util.dumps(result))
	page = result[0]['playListIndex']

	db.youtubeSongIndex.find_one_and_update({"sequence_value": {"$exists": True}}, {"$set": {"sequence_value": -1}})
	db.youtubeSongList.remove({})

	os.chdir(homepath + "/songList")

	mycmd = 'rm -rf ' + str(page)
	os.system(mycmd)
	mycmd = 'rm ../../songListTxt/songListReverse.txt'
	os.system(mycmd)

	return "delete all successfully"

@application.route('/addSongListPage/<string:listname>', methods=['GET'])
def addSongListPage(listname):
	os.chdir(homepath + "/songList")
	os.system("mkdir " + listname)
	return "add ListPage successfully"

# <----- YoutubeDL download area ----->
# download the youtube website
@application.route('/downloadYoutubeDL/<string:website>', methods=['GET'])
def downloadYoutubeDL(website):
	result = db.youtubeSongIndex.find({'sequence_value': {'$exists': True}})
	result = json.loads(json_util.dumps(result))
	page = result[0]['playListIndex']

	os.chdir(homepath + "/songList/" + str(page))
	os.system('youtube-dl -f bestaudio -o "%(title)s.%(ext)s" https://www.youtube.com/watch?v=' + website)

	return "download successfully"

# <----- Youtube song map List handle area ----->
# delete the specific song file
@application.route('/deleteYoutubeDLList/<int:index>', methods=['GET'])
def deleteYoutubeDLList(index):
	resultFind = db.youtubeSongList.find({"index": index})
	resultData = json.loads(json_util.dumps(resultFind))
	songName = resultData[0]['songName']

	db.youtubeSongList.remove({'songName': songName})

	result = db.youtubeSongIndex.find({'sequence_value': {'$exists': True}})
	result = json.loads(json_util.dumps(result))
	page = result[0]['playListIndex']

	os.system('find . -name "' + songName + '" -exec rm {} \\;')


	resultFind = db.youtubeSongIndex.find({"playNowIndex": {"$exists": True}})
	resultData = json.loads(json_util.dumps(resultFind))
	playNowIndex = resultData[0]['playNowIndex']

	if int(playNowIndex) >= index:
		db.youtubeSongIndex.find_and_modify(
			{' sequence_value': {'$exists': True} },
			{ "$inc": { "playNowIndex": -1 } },
		)

	db.youtubeSongList.remove({})
	return "delete successfully"

# play the specific songs
@application.route('/playsongList/<int:index>', methods=['GET'])
def playsongList(index):
	result = db.youtubeSongIndex.find({'sequence_value': {'$exists': True}})
	result = json.loads(json_util.dumps(result))
	page = result[0]['playListIndex']
	result = db.youtubeSongIndex.find_one_and_update({'isStopState': {'$exists': True}}, {"$set": {"isStopState": 0}})
	
	result = db.youtubeSongList.find().sort([("index", 1)])
	songList = json.loads(json_util.dumps(result))

	omx.play(page, songList[index]['songName'])

	return jsonify(songList)

# <----- Check the Rpi file and update songList in db area ----->
# from directory list the total files
@application.route('/checkYoutubeDLList', methods=['GET'])
def checkYoutubeDLList():
	result = db.youtubeSongIndex.find({'sequence_value': {'$exists': True}})
	result = json.loads(json_util.dumps(result))
	page = result[0]['playListIndex']
	if page == -1:
		return "no songList"
	path = homepath + "/songList/" + str(page)

	os.system("ls -t " + path + " > " + homepath + "/songListTxt/songList.txt")
	os.system("tac " + homepath + "/songListTxt/songList.txt > " + homepath + "/songListTxt/songListReverse.txt")

	songList = {}
	f = open(homepath + "/songListTxt/songListReverse.txt", "r")
	for index, song in enumerate(f.read().splitlines()):
		songList= {
			'index': index,
			'songName': song,
		}
		db.youtubeSongList.update({'index': index}, songList, upsert = True)


	result = db.youtubeSongList.find().sort([('index', 1)])
	result = json.loads(json_util.dumps(result))
	return jsonify(result)

# return all song formation (progress, index, ...)
@application.route('/checkSongIndex', methods=['GET'])
def checkSongIndex():
	position = omx.get_position()
	percentages = 0
	if position['duration'] != 0:
		percentages = 100 * float(position['position'])/float(position['duration'])
	result = db.youtubeSongIndex.find_one_and_update({'nowProgress': {'$exists': True}}, {"$set": {"nowProgress": percentages}})
	result = db.youtubeSongIndex.find({'playNowIndex': {'$exists': True}})
	result = json.loads(json_util.dumps(result))
	return jsonify(result)

# <----- handle next song callback area ----->
# update next Song
@application.route('/nextSongIndex/<int:index>', methods=['GET'])
def nextSongIndex(index):
	result = db.youtubeSongIndex.find_one_and_update({'playNowIndex': {'$exists': True}}, {"$set": {"playNowIndex": index}})
	return "set successfully"

# next Song
@application.route('/nextSong', methods=['GET'])
def nextSong():
	result = db.youtubeSongIndex.find_one_and_update({'playNowIndex': {'$exists': True}}, {"$inc": {"playNowIndex": 1}}, new=True)
	result = json.loads(json_util.dumps(result))
	
	song = db.youtubeSongList.find({'index': {'$exists': True}})
	song = json.loads(json_util.dumps(song))

	nowIndex = result['playNowIndex']

	if nowIndex > len(song) - 1:
		result = db.youtubeSongIndex.find_one_and_update({'playNowIndex': {'$exists': True}}, {"$set":{"playNowIndex": 0}})
		nowIndex = 0 
	if result['isContinue']:
		# requests.get('http://0.0.0.0:5000' + '/playsongList/' + str(nowIndex))
		result = db.youtubeSongIndex.find({'sequence_value': {'$exists': True}})
		result = json.loads(json_util.dumps(result))
		page = result[0]['playListIndex']
		result = db.youtubeSongIndex.find_one_and_update({'isStopState': {'$exists': True}}, {"$set": {"isStopState": 0}})
		
		result = db.youtubeSongList.find().sort([("index", 1)])
		songList = json.loads(json_util.dumps(result))

		omx.play(page, songList[nowIndex]['songName'])
		return "nextSong successfully"

# <----- songList setting area ----->
# when user change playlist -> change db
@application.route('/changeSongListPage/<int:index>', methods=['GET'])
def changeSongListPage(index):
	result = db.songListPage.find({'index': index})
	result = json.loads(json_util.dumps(result))
	result = db.youtubeSongIndex.find_one_and_update({'playListIndex': {'$exists': True}}, {"$set": {"playListIndex": result[0]['listPage']}})
	db.youtubeSongList.remove({})
	return "change SongListPage successfully"

@application.route('/getSongListPage', methods=['GET'])
def getSongListPage():
	db.songListPage.remove({})
	path = homepath + "/songList"
	os.system("ls -t " + path + " > " + homepath + "/songListTxt/songListPage.txt")

	listPage = {}
	f = open(homepath + "/songListTxt/songListPage.txt", "r")
	for index, name in enumerate(f.read().splitlines()):
		listPage = {
			'index': index,
			'listPage': name,
		}
		db.songListPage.update({'index': index}, listPage, upsert = True)


	result = db.songListPage.find().sort([('index', 1)])
	result = json.loads(json_util.dumps(result))
	return jsonify(result)

def main():
	ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", True)
	ENVIRONMENT_PORT = os.environ.get("APP_PORT", 5000)
	# <---- initial omxplayer setting ---->
	application.run(host='0.0.0.0', port=ENVIRONMENT_PORT, debug=ENVIRONMENT_DEBUG)


if __name__ == "__main__":
	main()