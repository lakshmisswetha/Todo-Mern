"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
require("dotenv").config();
const app = (0, express_1.default)();
const PORT = process.env.port || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/tododb")
    .then(() => console.log("db connected..."))
    .catch((err) => console.log(err));
app.use(todoRoute_1.default);
app.listen(PORT, () => console.log(`listening on: ${PORT}`));
