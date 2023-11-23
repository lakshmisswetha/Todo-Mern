"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.saveTodo = exports.getTodo = void 0;
const zod_1 = require("zod");
const todoModel_1 = __importDefault(require("../models/todoModel"));
const validationSchemas_1 = require("../utils/validationSchemas");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageIdx = 1, limit = 5 } = validationSchemas_1.paginationValidationSchema.parse(req.query);
        const todoList = yield todoModel_1.default
            .find({})
            .sort({ createdAt: -1 })
            .skip((pageIdx - 1) * limit)
            .limit(limit);
        const totalDocs = yield todoModel_1.default.find().count();
        const hasprev = pageIdx > 1;
        const hasNext = pageIdx * limit < totalDocs;
        return res.status(200).json({
            status: true,
            data: { todoList, totalDocs, hasNext, hasprev },
            message: "Successfully fetched",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
});
exports.getTodo = getTodo;
const saveTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield todoModel_1.default.create({
            text: validationSchemas_1.validateSave.parse(req.body).text,
            date: new Date(),
        });
        return res.status(201).json({ status: true, todo: data });
    }
    catch (err) {
        console.log(err);
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: err.errors,
            });
        }
        return res.status(500).json({ status: false });
    }
});
exports.saveTodo = saveTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, text } = validationSchemas_1.validateUpdate.parse(req.body);
        const result = yield todoModel_1.default.findByIdAndUpdate(_id, { text: text }, { new: true });
        if (result)
            return res.status(200).json({ status: true });
        else
            return res.status(200).json({ status: false });
    }
    catch (err) {
        console.log(err);
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: err.errors,
            });
        }
        return res.status(500).json({ status: false });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = validationSchemas_1.validateDelete.parse(req.body);
        yield todoModel_1.default.findByIdAndDelete(_id);
        return res.status(200).json({ status: true });
    }
    catch (err) {
        console.log(err);
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: err.errors,
            });
        }
        return res.status(500).json({ status: false });
    }
});
exports.deleteTodo = deleteTodo;
