require('dotenv').config();
const TwitterApi = require('twitter-api-v2').default;

const twitterClient = new TwitterApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})

const callbackURL = "http://127.0.0.1:5000/awtobot/us-central1/callback";

// todo in the future import the dbref from functions and call the stuff

module.exports = {
    twitterClient,
    callbackURL
}