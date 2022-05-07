require('dotenv').config();
const TwitterApi = require('twitter-api-v2').default;

const { dbRef } = require('../Database/firebase');

const twitterClient = new TwitterApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})

const callbackURL = "http://127.0.0.1:5000/awtobot/us-central1/callback";


async function handleTweetCommand(interaction) {
    // sendTweet

    if (interaction.options.getString("tweet-content") !== null) {
        await interaction.reply("Sending the tweet, dbl check from twitter app");
        let tweet = interaction.options.getString("tweet-content");
        console.log("Really sending tweet");

        await sendTweet(tweet);
    } else {
        await interaction.reply("You did command me, but we got some problemos");
    }
}

async function sendTweet(tweetContent) {
    const {refreshToken} = (await dbRef.get()).data();

    const {
        client: refreshedClient,
        accessToken,
        refreshToken: newRefreshToken
    } = await twitterClient.refreshOAuth2Token(refreshToken);

    await dbRef.set({ accessToken, refreshToken: newRefreshToken });

    console.log(refreshedClient);

    // const { data } = await refreshedClient.v2.me();

    // res.send(data);

    await refreshedClient.v2.tweet(tweetContent);
}

module.exports = {
    twitterClient,
    callbackURL,
    sendTweet,
    handleTweetCommand
}