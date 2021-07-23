FROM balenalib/raspberrypi3-debian

WORKDIR /var/www/
ADD ./app /var/www/

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get -y install build-essential python3 python3-pip
RUN apt-get -y install vlc python3-vlc
RUN apt-get -y install libraspberrypi0

# setting vlc
RUN apt-get -y remove --purge alsa-base pulseaudio
RUN apt-get -y install alsa-base pulseaudio
RUN apt-get -f install && apt-get -y autoremove && apt-get autoclean && apt-get clean
RUN chown -R $USER:$USER $HOME/
# RUN mv ~/.config/pulse ~/.config/pulse.bad

RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

EXPOSE 80

# CMD [ "gunicorn", "-w", "1", "--threads=1", "--bind", "0.0.0.0:80", "wsgi:app"]
CMD [ "gunicorn", "--bind", "0.0.0.0:80", "wsgi:app"]