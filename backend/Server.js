const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/todoRoute");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/tododb")
  .then((result) => console.log("db connected..."))
  .catch((err) => console.log(err));

app.use(routes);

app.listen(PORT, () => console.log(`listening on: ${PORT}`));
