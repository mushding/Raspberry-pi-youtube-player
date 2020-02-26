Raspberry-pi-youtube-player
===
![](https://i.imgur.com/OwecVXa.png)

## 0. Introduction 
This is a simple youtube player on Rpi, can quickly add youtube songs and change playlist using react flask omxPlayer and mongodb.

feature：
* download youtube songs to webm using youtube-dl
* can connected with hdmi to see the video or just connected to sound
* using react to visualized songlist in playlist
* adding playlist and deleting playlist
* change songs at every time every moment
* change volumn and mute
* pause and replay
* there is a linearbar to visualized how long dose the song play

## 1. Quickly run

### Requirements
Install following modules.
* Python 3.6.*
* flask
* pymongo
* omxPlayer
* youtube-dl
* mongodb
* nodejs
* react
* react-router-dom
* @material-ui/core
* @material-ui/icons

### quick start
```
cd Raspberry-pi-youtube-player
./bootexe.sh
```

## 2. TODO List
- [ ] build react with nginx
- [ ] pack whole code in docker images
