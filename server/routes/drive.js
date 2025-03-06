const express = require("express");
const { google } = require("googleapis");
const verifyToken = require("../middleware/verifyToken");
const User = require("../db/model/user");

const router = express.Router();

router.post("/upload", verifyToken, async (req, res) => {
  try {
    const  letterContent  = req.body;
    console.log("letter content", letterContent);
    
    const userId = req.userID;

    const user = await User.findOne({ uid: userId });
    if (!user || !user.googleAccessToken) {
      return res
        .status(400)
        .json({ error: "User not authenticated with Google Drive" });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: user.googleAccessToken });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const fileMetadata = {
      name: `${letterContent.title}.doc`,
      mimeType: "application/vnd.google-apps.document",
    };

    const media = {
      mimeType: "text/plain",
      body: letterContent.content,
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    res.json({
      message: "Letter saved successfully!",
      docUrl: `https://docs.google.com/document/d/${response.data.id}`,
    });
  } catch (error) {
    console.log("error during uploading letter on drive", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const userId = req.userID;

  try {
    const user = await User.findOne({ uid: userId });
    if (!user || !user.googleAccessToken) {
      return res
        .status(400)
        .json({ error: "User not authenticated with Google Drive" });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: user.googleAccessToken });

    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.document'",
      fields: "files(id, name, webViewLink)",
    });

    res.json(response.data.files);
  } catch (error) {
    console.log("Error during the geting drive data", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
