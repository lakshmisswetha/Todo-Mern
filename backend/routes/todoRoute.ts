import express from "express";
import {
    getTodo,
    saveTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todoController";
import { userAuth } from "../middleware/userAuth";

const router = express.Router();

router.get("/todo", userAuth, getTodo);
router.post("/todo", userAuth, saveTodo);
router.patch("/todo", userAuth, updateTodo);
router.delete("/todo", userAuth, deleteTodo);

export default router;
