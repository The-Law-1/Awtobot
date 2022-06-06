require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    new SlashCommandBuilder().setName("marco").setDescription("Replies with polo!"),
    new SlashCommandBuilder()
        .setName("poetry")
        .setDescription("Comes up with 3 poem suggestions")
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Prompt for neural network')
                .setRequired(true)),
        new SlashCommandBuilder()
        .setName("quotes")
        .setDescription("Comes up with 3 quote suggestions")
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Prompt for neural network')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName("tweet")
        .setDescription("Tweet a message")
        .addStringOption(option =>
            option.setName('tweet-content')
                .setDescription('Tweet content')
                .setRequired(true)),
    new SlashCommandBuilder().setName("sleep").setDescription("Pauses reminders")

].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_APP_ID, process.env.DISCORD_SERVER_ID), { body: commands })
    .then(() => console.log('Commands updated!'))
    .catch(console.error);

// * just run node deploy-commands.js in the terminal to register the commands
// * run it from the root to get environment