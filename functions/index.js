const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('dotenv').config();

// admin.initializeApp();
admin.initializeApp({credential: admin.credential.cert(
    JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64, 'base64').toString('ascii')))
});

const { twitterClient, callbackURL } = require('../Services/Twitter/twitter.js');

const dbRef = admin.firestore().doc("tokens/twitter");

exports.auth = functions.https.onRequest(async (req, res) => {
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
        callbackURL,
        { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] });


    await dbRef.set({codeVerifier, state});

    res.redirect(url);
});

exports.callback = functions.https.onRequest(async (req, res) => {

    const { state, code } = req.query;

    const dbSnapshot = await dbRef.get();
    const { codeVerifier, state: storedState } = dbSnapshot.data();

    if (state !== storedState) {
        return res.status(400).send("Stored tokens didn't match");
    }

    const {
        client: loggedClient,
        accessToken,
        refreshToken
    } = await twitterClient.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: callbackURL
    });

    await dbRef.set({ accessToken, refreshToken });

    res.sendStatus(200);
});

exports.tweet = functions.https.onRequest(async (req, res) => {
    const {refreshToken} = (await dbRef.get()).data();

    const {
        client: refreshedClient,
        accessToken,
        refreshToken: newRefreshToken
    } = await twitterClient.refreshOAuth2Token(refreshToken);

    await dbRef.set({ accessToken, refreshToken: newRefreshToken });

    console.log(refreshedClient);

    const { data } = await refreshedClient.v2.me();

    res.send(data);
});