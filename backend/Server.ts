import express, { Express } from "express";

const morgan = require("morgan");
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todoRoute";
import userRoutes from "./routes/userRoute";
const app: Express = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

mongoose
    .connect(process.env.DB || "")
    .then(() => console.log("db connected..."))
    .catch((err: any) => console.log(err));

app.use(userRoutes);
app.use(todoRoutes);

app.listen(PORT, () => console.log(`listening on: ${PORT}`));
