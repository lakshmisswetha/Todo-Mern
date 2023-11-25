import express, { Express } from "express";

const morgan = require("morgan");
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/todoRoute";

require("dotenv").config();

const app: Express = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

mongoose
    .connect("mongodb://127.0.0.1:27017/tododb")
    .then(() => console.log("db connected..."))
    .catch((err: any) => console.log(err));

app.use(routes);

app.listen(PORT, () => console.log(`listening on: ${PORT}`));
