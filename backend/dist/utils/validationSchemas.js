"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidationSchema = exports.validateUpdate = exports.validateDelete = exports.validateSave = void 0;
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
exports.paginationValidationSchema = zod_1.z.object({
    pageIdx: zod_1.z.coerce.number().positive().gt(0).default(2),
    limit: zod_1.z.coerce.number().positive().gt(2).default(5),
});
