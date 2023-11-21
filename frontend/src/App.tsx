import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { BASE_URL } from "./utils/config";
import { TextField, Button, ThemeProvider } from "@mui/material";
import { useFormik } from "formik";
// import * as yup from "yup";
import { z } from "zod";
import { toFormikValidate } from "zod-formik-adapter";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
    },
});

interface ITodoModel {
    _id: string;
    text: string;
}
// const basicSchema = yup.object().shape({
//     text: yup.string().max(4, "Maximum 4 characters"),
// });

const basicSchema = z.object({
    text: z.string().max(5, "maximum 5 allowed"),
});

const App = (): JSX.Element => {
    const [todo, setTodo] = useState<ITodoModel[]>([]);

    const [isUpdating, setIsUpdating] = useState(false);
    const [todoId, setTodoId] = useState("");

    const onSubmit = () => {
        if (isUpdating) {
            updateTodo(todoId, values.text, setIsUpdating);
        } else {
            addTodo(values.text);
        }
    };

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            text: "",
        },
        validate: toFormikValidate(basicSchema),
        onSubmit,
    });

    const fetchTodo = async () => {
        const response = await fetch(`${BASE_URL}/todo`);
        const data = await response.json();
        if (data.status) {
            setTodo(data.todo as ITodoModel[]);
        } else {
            console.log(data);
        }
    };
    const addTodo = async (text: string) => {
        try {
            const response = await fetch(`${BASE_URL}/todo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });
            if (response.ok) {
                text = "";
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
        setTodoId(_id);
        values.text = text;
    };

    return (
        <div className="App">
            <div className="container max-w-[600px] m-auto px-4 ">
                <h1 className="mt-4 text-center font-bold text-3xl">Todo App</h1>
                <ThemeProvider theme={theme}>
                    <form onSubmit={handleSubmit} className="top mt-4 flex gap-4 justify-center">
                        <TextField
                            id="standard-basic"
                            label={errors.text ? "error" : "Add Todos..."}
                            sx={{ width: "300px" }}
                            variant="standard"
                            value={values.text}
                            onChange={handleChange}
                            error={Boolean(errors.text)}
                            helperText={errors.text ? "Too Long" : ""}
                            name="text"
                        />
                        <Button type="submit" variant="contained" sx={{ width: "100px" }}>
                            {isUpdating ? "Update" : "Add"}
                        </Button>
                    </form>
                </ThemeProvider>

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
