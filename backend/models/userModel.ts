import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const userModel = mongoose.model<IUser>("userInfo", userSchema);
export default userModel;
