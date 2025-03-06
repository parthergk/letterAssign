const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("../middleware/verifyToken");
const Draft = require("../db/model/draft");

const router = express.Router();

router.post("/letter", verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userID;

  try {
    const draft = new Draft({ userId, title, content });
    await draft.save();
    res.status(201).json(draft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save draft" });
  }
});


router.get("/letter", verifyToken, async (req, res) => {
  const userId = req.userID;
  
  try {
    const drafts = await Draft.find({ userId });    
    res.json(drafts);
  } catch (error) {
    console.log("error during geting the draft letters", error);
    
    res.status(500).json({ error: "Failed to fetch drafts" });
  }
});

router.put("/letter/:id", verifyToken, async (req, res) => {
  const draftId = req.params.id;
  const { title, content } = req.body;
  const userId = req.userID;

  try {
    const draft = await Draft.findOneAndUpdate(
      { _id: draftId, userId },
      { title, content },
      { new: true }
    );

    if (!draft) {
      return res.status(404).json({ error: "Draft not found or unauthorized" });
    }

    res.json(draft);
  } catch (error) {
    res.status(500).json({ error: "Failed to update draft" });
  }
});

module.exports = router;
