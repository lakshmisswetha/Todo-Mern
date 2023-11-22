import { Request, Response } from "express";
import todoModel from "../models/todoModel";

interface SaveTodoRequest {
    text: string;
}
interface UpdateTodoRequest {
    _id: string;
    text: string;
}

export const getTodo = async (req: Request, res: Response) => {
    try {
        const data = await todoModel.find({}, { __v: 0 });
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
    const { text }: SaveTodoRequest = req.body;
    const data = await todoModel.create({ text });
    return res.status(201).json({ status: true, todo: data });
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { _id, text }: UpdateTodoRequest = req.body;

        const result = await todoModel.findByIdAndUpdate(
            _id,
            { text },
            { new: true }
        );
        if (result) return res.status(200).json({ status: true });
        else return res.status(200).json({ status: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { _id }: { _id: string } = req.body;
        await todoModel.findByIdAndDelete(_id);
        return res.status(200).json({ status: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
};
