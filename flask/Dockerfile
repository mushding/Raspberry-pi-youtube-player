FROM linkerlab/rpi-omxplayer

RUN apt update && \
    apt install software-properties-common && \
    apt install python3 && \
    apt-get install -y build-essential python3 python3-dev python3-pip python3-venv && \
    apt-get install libpcap-dev libpq-dev && \
    apt-get update && \
    apt-get install libdbus-1-dev libdbus-glib-1-dev

ENV GROUP_ID=1000 \
    USER_ID=1000

WORKDIR /var/www/

ADD . /var/www/
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

RUN groupadd -g $GROUP_ID www
RUN useradd -d /bin/sh -u $USER_ID -g www www
USER www

EXPOSE 5000

CMD [ "gunicorn", "-preload", "--bind", "0.0.0.0:5000", "wsgi"]