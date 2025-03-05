const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const letter = require('./routes/letter');
const mongoose = require("mongoose")
require("dotenv").config();

const app = express();
const port = 3000 || process.env.PORT;
const db_uri = process.env.DB_URI;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', auth);
app.use('/letter', letter);

main()
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server started successfully on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  });


async function main() {
  try {
    await mongoose.connect(db_uri);
  } catch (err) {
    throw new Error(`Database connection error: ${err.message}`);
  }
};
