const admin = require("firebase-admin");
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const verifyFirebaseToken = async(req, res, next)=>{
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }
    try {
        const verifyedToken = await admin.auth().verifyIdToken(token);
        req.user = verifyedToken;
        next(); 
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = verifyFirebaseToken;