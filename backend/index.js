const express = require("express");
// const connecttomongo = require("./db");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const connection_string = process.env.CONNECTION_STRING;

app.use(cors()); // isse dekhna hoga
app.use(express.json()); // json m bhjega

// connecttomongo();

app.use("/Register", require("./routes/Tuser.js"));
app.use("/compile", require("./routes/Compiler.js"));
app.use("/Workshop", require("./routes/Tevent.js"));

app.listen(800, () => {
  console.log("Listen");
});

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log("failed");
  });
