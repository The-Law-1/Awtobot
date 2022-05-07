const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('dotenv').config();


admin.initializeApp({credential: admin.credential.cert(
    JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64, 'base64').toString('ascii')))
});

const dbRef = admin.firestore().doc("tokens/twitter");

async function TestDBConnection()
{
    const dbSnapshot = await dbRef.get();
    const data = dbSnapshot.data();

    // console.log(data);
}

TestDBConnection();

module.exports = {
    dbRef
}