"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const todoValidation_1 = require("../middlewares/todoValidation");
const router = express_1.default.Router();
router.get("/todo", todoController_1.getTodo);
router.post("/todo", todoValidation_1.validateSaveTodo, todoController_1.saveTodo);
router.patch("/todo", todoController_1.updateTodo);
router.delete("/todo", todoController_1.deleteTodo);
exports.default = router;
