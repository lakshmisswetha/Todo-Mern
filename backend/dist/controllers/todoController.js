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
const todoModel_1 = __importDefault(require("../models/todoModel"));
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield todoModel_1.default.find({}, { __v: 0 });
        return res.status(200).json({
            status: true,
            todo: data,
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
        const { text } = req.body;
        const data = yield todoModel_1.default.create({ text });
        return res.status(201).json({ status: true, todo: data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
});
exports.saveTodo = saveTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, text } = req.body;
        const result = yield todoModel_1.default.findByIdAndUpdate(_id, { text }, { new: true });
        if (result)
            return res.status(200).json({ status: true });
        else
            return res.status(200).json({ status: false });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        yield todoModel_1.default.findByIdAndDelete(_id);
        return res.status(200).json({ status: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false });
    }
});
exports.deleteTodo = deleteTodo;
