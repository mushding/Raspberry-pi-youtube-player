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
1. change /dev/vchiq (the Rpi playing dev) to 777
```
sudo chmod 777 /dev/vchiq
```
2. run docker compose
```
cd Raspberry-pi-youtube-player
docker-compose up -d
```
3. make a mongodb user and database
```
docker exec -it <your mongodb container id> /bin/bash
mongo
```
```
# in the mongo

> use flaskdb
> db.createUser({user: 'flaskuser', pwd: 'password', roles: [{role: 'readWrite', db: 'flaskdb'}]})
> exit
```

## 2. TODO List
bug fix
- [ ] omxplayer dbus not found
