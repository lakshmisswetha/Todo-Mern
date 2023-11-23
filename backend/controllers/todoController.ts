import { Request, Response } from "express";
import { z } from "zod";
import todoModel from "../models/todoModel";
import {
    validateDelete,
    validateSave,
    validateUpdate,
} from "../utils/validationSchemas";

export const getTodo = async (req: Request, res: Response) => {
    try {
        const data = await todoModel
            .find({}, { __v: 0, versioning: false })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            todo: data,
            message: "Successfully fetched",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
};

export const saveTodo = async (req: Request, res: Response) => {
    try {
        const data = await todoModel.create({
            text: validateSave.parse(req.body).text,
            date: new Date(),
        });
        return res.status(201).json({ status: true, todo: data });
    } catch (err) {
        console.log(err);
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: err.errors,
            });
        }
        return res.status(500).json({ status: false });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { _id, text } = validateUpdate.parse(req.body);

        const result = await todoModel.findByIdAndUpdate(
            _id,
            { text: text },
            { new: true }
        );
        if (result) return res.status(200).json({ status: true });
        else return res.status(200).json({ status: false });
    } catch (err) {
        console.log(err);
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: err.errors,
            });
        }
        return res.status(500).json({ status: false });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { _id }: { _id: string } = validateDelete.parse(req.body);
        await todoModel.findByIdAndDelete(_id);
        return res.status(200).json({ status: true });
    } catch (err) {
        console.log(err);
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: err.errors,
            });
        }
        return res.status(500).json({ status: false });
    }
};
