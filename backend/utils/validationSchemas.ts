import { z } from "zod";
import mongooose from "mongoose";

export const validateSave = z.object({
    text: z.string().min(3),
});
export const validateDelete = z.object({
    _id: z
        .string()
        .refine((val) => mongooose.Types.ObjectId.isValid(val), "Invalid Id"),
});
export const validateUpdate = z.object({
    ...validateSave.shape,
    ...validateDelete.shape,
});
