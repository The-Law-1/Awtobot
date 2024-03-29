// const Discord = require('discord.js');
const {Client, Intents } = require('discord.js');
const { handleTweetCommand } = require('../Twitter/twitter');
require('dotenv').config();
const { runBrain } = require('./runBrain');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

var discordBotReady = false;

var currentReminderID = -1;

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

    // ! (function pointers ?)
    if (commandName === "marco") {
        await interaction.reply("polo");
    }

    if (commandName === "quotes") {
        await runBrain(interaction, SendMessage, "QuotesModel");
    }

    if (commandName === "poetry") {
        await runBrain(interaction, SendMessage, "PoemsModel");
    }

    if (commandName === "tweet") {
        // * clear timeouts !
        if (currentReminderID !== -1) {
            clearTimeout(currentReminderID);
            currentReminderID = -1;
        }

        await handleTweetCommand(interaction);
        // * every time you curate, remind you a day from now to tweet again, same time
        // interaction.reply("Reminding you");
        // currentReminderID = setTimeout(RemindMe, 1000 * 10);
        currentReminderID = setTimeout(RemindMe, 1000 * 60 * 60 * 24);
    }

    if (commandName === "sleep") {
        interaction.reply("Clearing timeouts");

        // * clear timeouts !
        if (currentReminderID !== -1) {
            clearTimeout(currentReminderID);
            currentReminderID = -1;
        }
    }

        // todo in the future maybe commands like 'take a break for an hour'
        // todo or maybe change model, etc...

    // * send it to the internet
})

async function RemindMe() {
    let myID = process.env.DISCORD_USER_ID;
    let curationChannelID = process.env.DISCORD_CURATION_CHANNEL_ID;

    // * give him some random catchphrases ?

    let message = `<@${myID}> Okay snake let's rattle !`;
    SendMessage(curationChannelID, message);

    currentReminderID = -1;
}

// * function to init bot ??

async function SendMessage(channelID, message) {

    const channel = client.channels.cache.get(channelID);

    console.log(channel.name);

    channel.send(message);
}

client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = {
    discordClient: client
}
