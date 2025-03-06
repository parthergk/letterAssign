const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../db/model/user");
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

const router = express.Router();

router.post("/google", verifyFirebaseToken, async (req, res) => {
    const { uid, email, name } = req.user;
    const {googleAccessToken} = req.body; 

    try {
        let user = await User.findOne({ uid });
        if (!user) {
            user = new User({ uid, email, name, googleAccessToken });
            await user.save();
        } else {
            user.googleAccessToken = googleAccessToken;
            await user.save();
        }

        const jwt_token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", jwt_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
