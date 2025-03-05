const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;

const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const verifyFirebaseToken = async(req, res, next)=>{
    const token = req.body.token;
    try {
        const verifyedToken = await admin.auth().verifyIdToken(token);
        req.user = verifyedToken;
        next(); 
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
}

app.post('/auth/google', (req, verifyFirebaseToken, res)=>{
    const {token} = req.body();

})

app.listen(port, ()=>{
    console.log("server is runing on port 3000");
})