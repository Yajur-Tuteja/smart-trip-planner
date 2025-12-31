import admin from "firebase-admin";

import dotenv from "dotenv";


dotenv.config({ path: ".env.local" })

console.log("ENV:", process.env.FIREBASE_JSON);


const serviceAccount = JSON.parse(
    Buffer.from(
        process.env.FIREBASE_JSON,
        "base64"
    ).toString("utf8")
);

console.log("ENV:", serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();