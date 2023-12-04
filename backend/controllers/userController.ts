import { Request, Response } from "express";
import userModel from "../models/userModel";
import { validateLogin, validateSignup } from "../utils/validationSchemas";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { z } from "zod";

interface IUser {
    _id: string;
    email: string;
    username: string;
    password: string;
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = validateLogin.parse(req.body);

        const user: IUser | null = await userModel.findOne({
            email,
        });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const payload = {
                    email,
                    id: user._id,
                    username: user.username,
                };
                const accessToken = jwt.sign(
                    payload,
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "2h" }
                );
                const refreshToken = jwt.sign(
                    payload,
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: "1d" }
                );

                return res.status(200).json({
                    accessToken,
                    refreshToken,
                    status: true,
                    message: "Login Successful",
                });
            } else {
                return res.status(401).json({
                    status: false,
                    error: "Invalid email or password",
                });
            }
        } else {
            return res.status(401).json({
                status: false,
                error: "user not found",
            });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: error.errors,
            });
        }
        return res.status(500).json({ status: false });
    }
};

export const userSignup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = validateSignup.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        if (await userModel.findOne({ email })) {
            return res.status(200).json({
                status: false,
                error: "email already exists",
            });
        } else {
            const newUser = await userModel.create({
                username,
                email,
                password: hashedPassword,
            });

            return res.status(200).json({
                status: true,
                user: newUser,
                message: "User Created",
            });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: error.errors,
            });
        }
        return res.status(500).json({ status: false });
    }
};
