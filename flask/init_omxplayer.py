from omxplayer.player import OMXPlayer
from pathlib import Path
from retrying import retry
import requests
import os 

class Omx:
    def __init__(self):
        self.home_folder = str(os.getcwd())
        self.init_folder = self.home_folder + "/omxPlayerInitailSound.wav"
        self.song_folder = self.home_folder + "/songList"
        self.server_ip = "http://0.0.0.0:5000"
        self.player = None
        self.volume = 1

    def init(self):
        for i in range(10):
            try:
                omxPlayerInitailSound = Path(self.init_folder)
                self.player = OMXPlayer(omxPlayerInitailSound)
            except:
                pass
    
    def play(self, pageName, songName):
        if not self.player:
            for i in range(10):
                try:
                    omxPlayerInitailSound = Path(self.init_folder)
                    self.player = OMXPlayer(omxPlayerInitailSound)
                except:
                    pass
        else:
            self.player.quit()
            self.player.load(self.song_folder + '/' + pageName + '/' + songName)
        self.player.exitEvent += self.on_player_exit
    
    def on_player_exit(self, player, exit_status):
        if exit_status == -15:
            return
        if exit_status == 3:
            return 
        requests.get(self.server_ip + '/nextSong')
 
    def replay(self):
        # error exception
        if not self.player:
            return

        self.player.play()

    def pause(self):
        # error exception
        if not self.player:
            return

        self.player.play_pause()

    def stop(self):
        # error exception
        if not self.player:
            return

        self.player.stop()
        self.player = None

    def set_volume(self, volume):
        # error exception
        if not self.player:
            return
        self.volume = self.volume + volume
        if self.volume > 10:
            self.volume = 10
        elif self.volume < 0:
            self.volume = 0
        
        self.player.set_volume(self.volume)
    
    def get_position(self):
        # error exception
        try:
            position = {
                "position": self.player.position(),
                "duration": self.player.duration(),
            }
        except Exception as e:
            position = {
                "position": 0,
                "duration": 0,
            }
        finally:
            return position
    
    def get_state(self):
        pass