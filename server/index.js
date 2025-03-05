const express = require("express");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const cors= require("cors");

require('dotenv').config();

const app = express();
const port = 3000 || process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

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

app.post('/auth/google', verifyFirebaseToken, (req, res)=>{
    const {token} = req.body;
    const jwt_token = jwt.sign(token, process.env.JWT_SECRET);

    res.cookie("token", jwt_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
  
      res.status(200).json({ message: "Login successful" });
})

app.listen(port, ()=>{
    console.log("server is runing on port 3000");
})