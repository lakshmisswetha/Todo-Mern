import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const saveTodoSchema = z.object({
    text: z.string().min(3),
});

export const validateSaveTodo = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = saveTodoSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ status: false, message: "Invalid Data" });
    }
};
