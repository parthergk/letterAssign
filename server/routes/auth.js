const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../db/model/user");
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

const router = express.Router();

router.post("/google", verifyFirebaseToken, async (req, res) => {
    const { uid, email, name } = req.user;

    try {
        let user = await User.findOne({ uid });
        if (!user) {
            user = new User({ uid, email, name });
            await user.save();
        }

        const jwt_token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", jwt_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
