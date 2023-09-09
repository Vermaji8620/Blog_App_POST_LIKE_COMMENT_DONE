const express = require("express");
const app = express();

require("dotenv").config();

const dbconnect = require("./config/database");
dbconnect();

app.use(express.json());

const todos = require("./routes/bloj");
app.use("/api/v1", todos);

app.get("/", (req, res) => {
  res.send(`<div><b>running your page</b></div>`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Running successfully");
});
