const baseUrl = "http://localhost:5000";

const getAllTodo = async (setTodo) => {
    try {
        const response = await fetch(`${baseUrl}/todo`);
        const data = await response.json();
        if (data.status) {
            setTodo(data.todo);
        } else {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
};

const addTodo = async (text, setText, setTodo) => {
    try {
        const data = await fetch(`${baseUrl}/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });
        setText("");
        await getAllTodo(setTodo);
    } catch (err) {
        console.log(err);
    }
};

const updateTodo = async (todoId, text, setText, setTodo, setIsUpdating) => {
    try {
        const data = await fetch(`${baseUrl}/todo`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: todoId, text }),
        });
        setText("");
        setIsUpdating(false);
        await getAllTodo(setTodo);
    } catch (err) {
        console.log(err);
    }
};

const deleteTodo = async (_id, setTodo) => {
    try {
        const data = await fetch(`${baseUrl}/todo`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id }),
        });
        getAllTodo(setTodo);
    } catch (err) {
        console.log(err);
    }
};

export { getAllTodo, addTodo, updateTodo, deleteTodo };
