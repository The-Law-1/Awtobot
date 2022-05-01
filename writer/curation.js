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


client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand())
        return;

    const { commandName } = interaction;

    // ! ask Victor how he handles this (function pointers ?)
    if (commandName === "marco") {
        await interaction.reply("polo");
    }

    // todo /post => send content of command

        // todo in the future maybe commands like 'take a break for an hour'
        // todo or maybe change model, etc...

    // * send it to the internet
})

async function SendMessage(channelID, message) {

    const channel = client.channels.cache.get(channelID);

    console.log(channel.name);

    channel.send(message);
}



client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = {
    SendMessage
}
