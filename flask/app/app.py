# <---- import session ---->
# import flask
from flask import Flask, jsonify
from flask_cors import CORS
import requests

# for youtube player
import os
import time

# import youtube downloader
import youtube_dl

# import mongodb
import vlc
from vlc_player import Player


# <---- initail flask session ---->
# initail flask
app = Flask(__name__)
CORS(app)

# <---- initail variable ---->
isContinue = True
playNowIndex = -1
playList = []
currentPlayList = 'none'
currentSongList = []


# get home pwd
homepath = str(os.getcwd())
init_folder = os.path.join(homepath, "omxPlayerInitailSound.wav")
song_folder = os.path.join(homepath, "songList", currentPlayList)

def on_player_exit(event):
    nextSong()

# <---- initail vlc player ---->
player = Player()
player.add_callback(vlc.EventType.MediaPlayerEndReached, on_player_exit)

# Youtube Player
# <----- user press top button area ----->
# replay playing now
@app.route('/api/replayYoutubeDLList', methods=['GET'])
def replayYoutubeDLList():
    player.resume()
    return "play sound successfully"

# pause playing now
@app.route('/api/pauseYoutubeDLList', methods=['GET'])
def pauseYoutubeDLList():
    player.pause()
    return "pause sound successfully"

# stop playing now
@app.route('/api/stopYoutubeDLList', methods=['GET'])
def stopYoutubeDLList():
    player.stop()
    return "stop sound successfully"

# Stop Continue
@app.route('/api/stopContinue', methods=['GET'])
def stopContinue():
    isContinue = False
    return "set successfully"

# Start Continue
@app.route('/api/startContinue', methods=['GET'])
def startContinue():
    isContinue = True
    return "set successfully"

# Change Volume
@app.route('/api/changeVolume/<int:setVolume>', methods=['GET'])
def changeVolume(setVolume):
    volume = player.get_volume()
    if setVolume == 0:
        volume = volume - 1
        player.set_volume(volume)
    elif setVolume == 1:
        volume = volume + 1
        player.set_volume(volume)
    elif setVolume == 2:
        player.set_volume(0)
    return "change successfully"

# delete all song file
@app.route('/api/deleteAllSong', methods=['GET'])
def deleteAllSong():
    os.system('rm -rf ' + song_folder)

    return "delete all successfully"

@app.route('/api/addSongListPage/<string:listname>', methods=['GET'])
def addSongListPage(listname):
    listPath = os.path.join(homepath, "songList", listname)
    os.system("mkdir " + listPath)
    requests.get('http://backend/api/getSongListPage')

    return "add ListPage successfully"

# <----- YoutubeDL download area ----->
# download the youtube website
@app.route('/api/downloadYoutubeDL/<string:website>', methods=['GET'])
def downloadYoutubeDL(website):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': os.path.join(song_folder, "%(title)s.%(ext)s")
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download(["https://www.youtube.com/watch?v=" + website])

    return "download successfully"

# <----- Youtube song map List handle area ----->
# delete the specific song file
@app.route('/api/deleteYoutubeDLList/<int:index>', methods=['GET'])
def deleteYoutubeDLList(index):
    global playNowIndex
    songName = currentSongList[index]['songName']
    os.system('rm -rf ' + os.path.join(song_folder, songName))

    if int(playNowIndex) >= index:
        playNowIndex -= 1

    return "delete successfully"

def playsong(index):
    global player

    player = Player()
    player.add_callback(vlc.EventType.MediaPlayerEndReached, on_player_exit)
    songName = currentSongList[index]['songName']
    player.play(os.path.join(song_folder, songName))

    return "play success"

# play the specific songs
@app.route('/api/playsongList/<int:index>', methods=['GET'])
def playsongList(index):
    global playNowIndex
    playNowIndex = index
    
    songName = currentSongList[index]['songName']
    player.play(os.path.join(song_folder, songName))

    return "play success"

# <----- Check the Rpi file and update songList in db area ----->
# from directory list the total files
@app.route('/api/checkYoutubeDLList', methods=['GET'])
def checkYoutubeDLList():
    global currentSongList
    if currentPlayList == "none":
        return "no playList"
    
    os.chdir(song_folder)
    songListByFile = sorted(os.listdir(), key=os.path.getmtime, reverse=True)

    currentSongList = []
    for index, song in enumerate(songListByFile):
        currentSongList.append({
            'index': index,
            'songName': song,
        })

    song_info = {
        'songList': currentSongList,
        'playNowIndex': playNowIndex,
        'state': player.get_state(),
        'position': player.get_position() * 100
    }

    return jsonify(song_info)

# <----- handle next song callback area ----->
# next Song
@app.route('/api/nextSong', methods=['GET'])
def nextSong():
    global playNowIndex

    if playNowIndex == len(currentSongList) - 1:
        playNowIndex = 0 
    else:
        playNowIndex += 1 
    if isContinue:
        playsong(playNowIndex)

    return "nextSong successfully"

# <----- songList setting area ----->
# when user change playlist -> change db
@app.route('/api/changeSongListPage/<int:index>', methods=['GET'])
def changeSongListPage(index):
    global currentPlayList
    global song_folder
    currentPlayList = playList[index]['listPage']
    song_folder = os.path.join(homepath, "songList", currentPlayList)

    return "change SongListPage successfully"

@app.route('/api/getSongListPage', methods=['GET'])
def getSongListPage():
    global playList

    os.chdir(os.path.join(homepath, "songList"))
    playListByFile = sorted(os.listdir(), key=os.path.getmtime, reverse=True)

    playList = []
    for index, name in enumerate(playListByFile):
        playList.append({
            'index': index,
            'listPage': name,
        })

    return jsonify(playList)

@app.route('/api/removePulseaudio', methods=['GET'])
def removePulseaudio():
    os.system('apt-get --purge --reinstall install pulseaudio')
    os.system('mv ~/.config/pulse ~/.config/pulse.old')

    return "remove pulseaudio success"