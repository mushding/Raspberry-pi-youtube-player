Raspberry-pi-youtube-player
===
###### tags: `github README.md`
![](https://i.imgur.com/OwecVXa.png)

## 0. Introduction 
This is a simple youtube player on Rpi. It can quickly download youtube songs and change playlist using react flask vlc player.

feature：
* download youtube songs to webm using youtube-dl
* using react to visualized songlist in playlist
* adding playlist and deleting playlist
* change songs at every time every moment
* change volumn and mute
* pause and replay
* there is a progress bar to visualized how long dose the song play

## 1. Quickly run

### Requirements
Install following modules.
* docker
* docker-compose

### quick start
1. build docker compose
```
cd Raspberry-pi-youtube-player
docker-compose up --build
```

2. go to `localhost:5000`, and there you have it!
