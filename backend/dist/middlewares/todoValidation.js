"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTodo = exports.validateDeleteTodo = exports.validateSaveTodo = exports.validateUpdate = exports.validateDelete = exports.validateSave = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.validateSave = zod_1.z.object({
    text: zod_1.z.string().min(3),
});
exports.validateDelete = zod_1.z.object({
    _id: zod_1.z
        .string()
        .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), "Invalid Id"),
});
exports.validateUpdate = zod_1.z.object(Object.assign(Object.assign({}, exports.validateSave.shape), exports.validateDelete.shape));
const validateSaveTodo = (req, res, next) => {
    try {
        const data = exports.validateSave.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            message: "Invalid Data",
            error: error.errors,
        });
    }
};
exports.validateSaveTodo = validateSaveTodo;
const validateDeleteTodo = (req, res, next) => {
    try {
        exports.validateDelete.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            console.log(error.errors);
    }
};
exports.validateDeleteTodo = validateDeleteTodo;
const validateUpdateTodo = (req, res, next) => {
    try {
        exports.validateUpdate.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError)
            console.log(error.errors);
    }
};
exports.validateUpdateTodo = validateUpdateTodo;
