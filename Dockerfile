FROM python:3.9-slim

WORKDIR /Awtobot

# copy local files
COPY [".", "/Awtobot"]

RUN apt-get update -y && apt-get install nodejs npm -y

# https://itsjavascript.com/solved-error-cannot-find-module-nodeevents#:~:text=The%20Error%3A%20Cannot%20find%20module%20'node%3Aevents'%20occurs,issue%20by%20upgrading%20the%20Node.
# * version might be the problem but I can't figure out how to fix it.
RUN nodejs -v

# * also tensorflow is taking a while to install. Chalk it up to bad internet ?
# install server dependencies
RUN  pip install -r ./requirements.txt \
    && npm install --silent

CMD ["npm", "start"]
