import { FC } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TodoProps {
    text: string;
    updateMode: () => void;
    deleteTodo: () => void;
}

const Todo: FC<TodoProps> = ({ text, updateMode, deleteTodo }) => {
    return (
        <div className="todo relative mt-4 bg-black py-[1.5rem] px-[3rem] rounded-[5px]">
            <div className="text text-white">{text}</div>
            <div className="icons absolute top-1/2 transform -translate-y-1/2 right-[20px] flex gap-[0.5rem]">
                <EditIcon
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={updateMode}
                ></EditIcon>
                <DeleteIcon
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={deleteTodo}
                ></DeleteIcon>
            </div>
        </div>
    );
};

export default Todo;
