Raspberry-pi-youtube-player
===
###### tags: `github README.md`
![](https://i.imgur.com/OwecVXa.png)

## 0. Introduction 
This is a simple youtube player on Rpi. It can quickly download youtube songs and change playlist using react flask omxPlayer and mongodb.

feature：
* download youtube songs to webm using youtube-dl
* using react to visualized songlist in playlist
* adding playlist and deleting playlist
* change songs at every time every moment
* change volumn and mute
* pause and replay
* there is a linearbar to visualized how long dose the song play

## 1. Quickly run

### Requirements
Install following modules.
* docker
* docker-compose

### quick start
```
sudo chmod 777 /dev/vchiq
cd Raspberry-pi-youtube-player
docker-compose up -d
```

## 2. TODO List
bug fix
- [ ] omxplayer dbus not found
