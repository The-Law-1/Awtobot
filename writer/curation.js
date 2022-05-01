// const Discord = require('discord.js');
const {Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

var discordBotReady = false;

client.once('ready', () => {
    console.log("Ready !");
    discordBotReady = true;

    // * tell your other bois (scripts) to start reading and rhyming

    SendMessage(process.env.DISCORD_CURATION_CHANNEL_ID, "I'm ready to read and rhyme!");
});

async function SendMessage(channelID, message) {

    const channel = client.channels.cache.get(channelID);

    console.log(channel.name);

    channel.send(message);
}

client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = {
    SendMessage
}
