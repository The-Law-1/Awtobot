const fs = require('fs');
const path = require('path');

function CleanText(text)
{
    // split text into lines
    let lines = text.split("\n");

    // remove empty lines
    lines = lines.filter((line) => line.length > 0);

    // split lines into groups of two
    let groups = [];
    for (let i = 0; i < lines.length; i += 2) {
        groups.push(lines[i] + lines[i + 1]);
    }

    return (groups);
}

// * i don't know if this path is relative or what ?
function ReadBrainThoughts(outputPath="../../brain/output.txt")
{
    let text = "";
    // read file with fs
    try {
        text = fs.readFileSync(path.resolve(__dirname, outputPath), 'utf8');

    } catch (error) {
        console.log(error);
        return (error);
    }
    return text;
}

module.exports = {
    CleanText,
    ReadBrainThoughts
}

// let thoughts = ReadBrainThoughts();

// let suggestions = CleanText(thoughts);

// MakeItRhyme(suggestions);