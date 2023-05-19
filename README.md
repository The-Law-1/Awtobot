# Awtobot

Awtobot is a simple twitter bot controlled by a Discord bot. I have created a few commands to trigger the bot, depending on the command, it will run a specific tensorflow model (in my case I have one trained on famous quotes, and another on poetry, approx. 10GB of data each).
The bot will then generate a random text based on the model and tweet it. Then, the /tweet command will send the tweet to the Discord channel.

## Installation

In a .env file at the root of the project, you will need to add the following variables:

```bash
CLIENT_ID= ... # Twitter client ID
CLIENT_SECRET= ... # Twitter client secret

GOOGLE_CONFIG_BASE64= ... # Google credentials in base64 for firestore

DISCORD_BOT_TOKEN= ... # Discord bot token

DISCORD_USER_ID= ... # Discord user ID
DISCORD_APP_ID= ... # Discord app ID
DISCORD_SERVER_ID= ... # Discord server ID
DISCORD_CURATION_CHANNEL_ID= ... # Discord channel ID
```

Then to run the bot:

```bash
 pip install -r ./requirements.txt && npm install && npm run start
```

https://twitter.com/Awto_bot