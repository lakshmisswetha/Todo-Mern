import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { BASE_URL } from "./utils/config";

interface ITodoModel {
    _id: string;
    text: string;
}

const App = (): JSX.Element => {
    const [todo, setTodo] = useState<ITodoModel[]>([]);
    const [text, setText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [todoId, setTodoId] = useState("");

    const fetchTodo = async () => {
        const response = await fetch(`${BASE_URL}/todo`);
        const data = await response.json();
        if (data.status) {
            setTodo(data.todo as ITodoModel[]);
        } else {
            console.log(data);
        }
    };
    const addTodo = async (text: string, setText: React.Dispatch<React.SetStateAction<string>>) => {
        try {
            const response = await fetch(`${BASE_URL}/todo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });
            if (response.ok) {
                setText("");
                await fetchTodo();
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const updateTodo = async (
        todoId: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,

        setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        try {
            const response = await fetch(`${BASE_URL}/todo`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: todoId, text }),
            });
            if (response.ok) {
                setText("");
                setIsUpdating(false);
                await fetchTodo();
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTodo = async (_id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/todo`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id }),
            });
            if (response.ok) {
                fetchTodo();
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        //getAllTodo(setTodo);
        fetchTodo();
    }, []);

    const updateMode = (_id: string, text: string) => {
        setIsUpdating(true);
        setText(text);
        setTodoId(_id);
    };

    return (
        <div className="App">
            <div className="container max-w-[600px] m-auto px-4 ">
                <h1 className="mt-4 text-center font-bold text-3xl">Todo App</h1>
                <div className="top mt-4 flex gap-4 justify-center">
                    <input
                        className="outline-none w-[400px] p-[0.5rem] border-b border-solid border-black "
                        type="text"
                        placeholder="Add Todos..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div
                        onClick={
                            isUpdating
                                ? () => updateTodo(todoId, text, setText, setIsUpdating)
                                : () => addTodo(text, setText)
                        }
                        className="add cursor-pointer px-[1.5rem] py-[0.5rem] bg-black text-white"
                    >
                        {isUpdating ? "Update" : "Add"}
                    </div>
                </div>
                <div className="list">
                    {todo.map((item: ITodoModel) => (
                        <Todo
                            key={item._id}
                            text={item.text}
                            updateMode={() => updateMode(item._id, item.text)}
                            deleteTodo={() => deleteTodo(item._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
