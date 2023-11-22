import express from "express";
import {
    getTodo,
    saveTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todoController";
import { validateSaveTodo } from "../middlewares/todoValidation";

const router = express.Router();

router.get("/todo", getTodo);
router.post("/todo", validateSaveTodo, saveTodo);
router.patch("/todo", updateTodo);
router.delete("/todo", deleteTodo);

export default router;
