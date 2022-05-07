// import axios
const axios = require('axios');

// takes an array of suggestions and makes the final word rhyme
async function MakeItRhyme(suggestions)
{
    let rhymedSuggestions = [];

    for (let i = 0; i < suggestions.length; i++) {
        const suggestion = suggestions[i];

        // console.log(suggestion + "\n")

        // * get first punctuation in suggestion
        let position = suggestion.search(/[.,:?;]/);

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
            let rhymeSuggestion = await axios.get('https://api.datamuse.com/words?rel_rhy=' + rhyme1);
            // let rhymeSuggestion2 = await axios.get('https://api.datamuse.com/words?rel_rhy=' + rhyme2);

            words2.pop();
            // * append a random suggestion to words2
            words2.push(rhymeSuggestion.data[Math.floor(Math.random() * rhymeSuggestion.data.length)].word);

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
    MakeItRhyme
}