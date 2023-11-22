import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
    text: string;
}

const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
});
const TodoModel = mongoose.model<ITodo>("todoInfo", todoSchema);
export default TodoModel;

//module.exports = mongoose.model("todoInfo", todoSchema);
