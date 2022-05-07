// * we processin'!
const {spawn} = require('child_process');
const { CleanText, ReadBrainThoughts } = require('../Processor/brainparser');
const { MakeItRhyme, MakeItRhyme2 } = require('../Processor/datamuse');

// * take the interaction, and a function to send messages
async function runBrain(interaction, sendMessageFct) {
    // * message maybe contains the prompt, or model path ?

    // * acknowledge the message, "Running brain, will ping you when ready"
    await interaction.reply("Thinking... Will ping you when ready!");

    let pathToBrain = "./brain/main.py";

    // * beginning of an inspirational quote, could come from the message body
    let prompt = "In times of ";

    console.log("interaction option ", interaction.options.getString("prompt"));
    // * contains a message ?
    if (interaction.options.getString("prompt") !== null)
        prompt = interaction.options.getString("prompt");

    console.log("prompt ", prompt);

    // * the start could be any of /QuotesModel
    let modelName = "QuotesModel"; // * could also be "QuotesModel", "MovieModel", "PoemsModel";
    let modelPath = `/${modelName}/Training-20EPOCHS/content/one_step`;

    const brainProcess = spawn('python3', [pathToBrain, modelPath, prompt]);

    brainProcess.on('close', async (code) => {

        // * read the output.txt
        let thoughts = ReadBrainThoughts();

        let suggestions = CleanText(thoughts);

        console.log("Brain is done", suggestions);

        // * call make it rhyme
        let rhymedSuggestions = await MakeItRhyme(suggestions);
        // let rhymedSuggestions = await MakeItRhyme2(suggestions);
        // console.log("Retrieved suggestions ", rhymedSuggestions);

        let finalmessage = `<@${interaction.user.id}>`

        for (let i = 0; i < rhymedSuggestions.length; i++) {
            const sugg = rhymedSuggestions[i];
            // console.log("Adding sugg ", sugg);
            finalmessage += "\n" + sugg;
        }

        // * send the output to the callback function, ping me
        sendMessageFct(interaction.channelId, finalmessage);
    });
}

module.exports = {
    runBrain
}