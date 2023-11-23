import express from "express";
import {
    getTodo,
    saveTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todoController";

const router = express.Router();

router.get("/todo", getTodo);
router.post("/todo", saveTodo);
router.patch("/todo", updateTodo);
router.delete("/todo", deleteTodo);

export default router;
