import { FC } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

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
                <BiEdit
                    className="icon text-white cursor-pointer text-[20px]"
                    onClick={updateMode}
                />
                <AiFillDelete
                    className="icon text-white cursor-pointer text-[20px]"
                    onClick={deleteTodo}
                />
            </div>
        </div>
    );
};

export default Todo;
