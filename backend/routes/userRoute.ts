import express from "express";
import { userLogin, userSignup } from "../controllers/userController";

const router = express.Router();

router.post("/user/login", userLogin);
router.post("/user/signup", userSignup);

export default router;
