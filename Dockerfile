FROM python:3.9

WORKDIR /Awtobot

# copy local files
COPY [".", "/Awtobot"]

RUN apt-get update -y && apt-get install nodejs npm -y

RUN npm install -g n

RUN n lts

# install server dependencies
RUN  pip install -r ./requirements.txt \
    && npm install --silent


RUN node -v

CMD ["npm", "start"]
