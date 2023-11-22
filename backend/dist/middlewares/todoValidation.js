"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSaveTodo = exports.saveTodoSchema = void 0;
const zod_1 = require("zod");
exports.saveTodoSchema = zod_1.z.object({
    text: zod_1.z.string().min(3),
});
const validateSaveTodo = (req, res, next) => {
    try {
        const data = exports.saveTodoSchema.parse(req.body);
        req.validatedData = data;
        next();
    }
    catch (error) {
        return res.status(400).json({ status: false, message: "Invalid Data" });
    }
};
exports.validateSaveTodo = validateSaveTodo;
