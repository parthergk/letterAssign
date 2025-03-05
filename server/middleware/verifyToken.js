const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {  
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: "You must log in" });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          return res.status(401).json({ message: "You must log in" });
        }
        const { uid } = payload;
        req.userID = uid;
        next();
      });
  } catch (error) {
    console.error("Server-side error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
};
module.exports = verifyToken;