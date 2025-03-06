const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const draft = require('./routes/draft');
const drive = require('./routes/drive');
const mongoose = require("mongoose")
require("dotenv").config();

const app = express();
const port = 3000 || process.env.PORT;
const db_uri = process.env.DB_URI;

app.use(
  cors({
    origin: "https://letter-assign.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', auth);
app.use('/draft', draft);
app.use('/letter', drive);


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
