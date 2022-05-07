// import axios
const axios = require('axios');

async function MakeItRhyme2(suggestions) {
    let rhymedSuggestions = [];

    for (let i = 0; i < suggestions.length; i++) {
        const suggestion = suggestions[i];

        // * split the suggestion into words
        let words = suggestion.split(" ");

        // * make sentence from first half of words
        let sentence = words.slice(0, Math.floor(words.length / 2) - 1);
        let sentence2 = words.slice(Math.floor(words.length / 2), words.length);

        // * get last words
        let rhyme1 = sentence[sentence.length - 1]
        let rhyme2 = sentence2[sentence2.length - 1];

        try {
            // * get rhymes for last words
            // * try using the ml for related to ...
            let rhymeSuggestion = await axios.get('https://api.datamuse.com/words?rel_rhy=' + rhyme1);
            // let rhymeSuggestion2 = await axios.get('https://api.datamuse.com/words?rel_rhy=' + rhyme2);

            if (rhymeSuggestion.data[Math.floor(Math.random() * rhymeSuggestion.data.length)].word) {
                sentence2.pop();
                // * append a random suggestion to words2
                let finalRhyme = rhymeSuggestion.data[Math.floor(Math.random() * rhymeSuggestion.data.length)].word;
                sentence2.push(finalRhyme);
                console.log("Successfully rhymed " + rhyme1 + " with " + finalRhyme);
            }

        } catch (error) {
            console.log(error);
        }

        // * concatenate words and words 2
        let final = sentence.concat(sentence2);
        // * turn array of strings into single string
        final = final.join(" ");
        // console.log("Final ", final);

        rhymedSuggestions.push(final);
    }

    return (rhymedSuggestions);
}

// takes an array of suggestions and makes the final word rhyme
async function MakeItRhyme(suggestions)
{
    let rhymedSuggestions = [];

    for (let i = 0; i < suggestions.length; i++) {
        const suggestion = suggestions[i];

        // console.log(suggestion + "\n")

        // * get first punctuation in suggestion
        let position = suggestion.search(/[.,:?;]/);

        if (position === -1) {
            position = Math.floor(Math.random() * suggestion.length);
        }

        // * get sentence before and after punctuation
        let sentences = suggestion.split(suggestion[position]);

        // * split the sentences into words and clean 'em
        let words = sentences[0].split(" ");
        let words2 = sentences[1].split(" ");
        words = words.filter((word) => word.length > 0);
        words2 = words2.filter((word) => word.length > 0);

        // * get last words
        let rhyme1 = words[words.length - 1]
        let rhyme2 = words2[words2.length - 1];

        try {
            // * get rhymes for last words
            // * try using the ml for related to ...
            let rhymeSuggestion = await axios.get('https://api.datamuse.com/words?rel_rhy=' + rhyme1 + "&ml=" + rhyme1);
            // let rhymeSuggestion2 = await axios.get('https://api.datamuse.com/words?rel_rhy=' + rhyme2);

            words2.pop();
            // * append a random suggestion to words2
            // * if we have a lot of choices, take one in the top ten not some random ass suggestion
            let finalRhyme = rhymeSuggestion.data[Math.floor(Math.random() * (rhymeSuggestion.data.length > 10 ? 10 : rhymeSuggestion.data.length) )].word || rhyme2;
            words2.push(finalRhyme + "\n");

            console.log("Successfully rhymed " + rhyme1 + " with " + finalRhyme);


        } catch (error) {
            console.log(error);
        }

        // * concatenate words and words 2
        let final = words.concat(words2);
        // * turn array of strings into single string
        final = final.join(" ");
        // console.log("Final ", final);

        rhymedSuggestions.push(final);
    };

    // console.log("Datamuse returning ", rhymedSuggestions);

    return rhymedSuggestions;
}

/*async function DoThing()
{
    // get request using axios
    try {
        let res = await axios.get('https://api.datamuse.com/words?sl=moo');
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}*/

module.exports = {
    MakeItRhyme,
    MakeItRhyme2
}