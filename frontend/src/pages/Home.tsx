import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import { BASE_URL } from "../utils/config";
import { TextField, Button, ThemeProvider, TablePagination, Skeleton, Stack } from "@mui/material";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidate } from "zod-formik-adapter";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

const basicSchema = z.object({
    text: z.string().max(5, "maximum 5 allowed"),
});

const Home = (): JSX.Element => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState<ITodoModel[]>([]);

    const [isUpdating, setIsUpdating] = useState(false);
    const [todoId, setTodoId] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [paginationInfo, setPaginationInfo] = useState({
        totalDocs: 5,
        hasNext: false,
        hasPrev: false,
    });
    const [loading, setLoading] = useState(true);

    const onSubmit = () => {
        if (isUpdating) {
            updateTodo(todoId, values.text, setIsUpdating);
            values.text = "";
        } else {
            addTodo(values.text);
            values.text = "";
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
        setLoading(true);
        const response = await fetch(`${BASE_URL}/todo?pageIdx=${page}&limit=${limit}`, {
            headers: {
                Authorization: "bearer " + localStorage.getItem("accessToken") || "",
            },
        });
        const data = await response.json();

        if (response.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }

        if (data.status) {
            setTodo(data.data.todoList as ITodoModel[]);
            setPaginationInfo({
                totalDocs: data.data.totalDocs,
                hasPrev: data.data.hasPrev,
                hasNext: data.data.hasNext,
            });
            setLoading(false);
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
                    Authorization: "bearer " + localStorage.getItem("accessToken") || "",
                },
                body: JSON.stringify({ text }),
            });
            if (response.status === 401) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
            const data = await response.json();
            if (data.status) {
                text = "";
                await fetchTodo();
            } else {
                console.log(data);
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
                    Authorization: "bearer " + localStorage.getItem("accessToken") || "",
                },
                body: JSON.stringify({ _id: todoId, text }),
            });
            if (response.status === 401) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
            const data = await response.json();
            if (data.status) {
                setIsUpdating(false);
                values.text = "";
                await fetchTodo();
            } else {
                console.log(data);
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
                    Authorization: "bearer " + localStorage.getItem("accessToken") || "",
                },
                body: JSON.stringify({ _id }),
            });
            if (response.status === 401) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
            const data = await response.json();
            if (data.status) {
                fetchTodo();
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTodo();
    }, [page, limit]);

    const updateMode = (_id: string, text: string) => {
        setIsUpdating(true);
        setTodoId(_id);
        values.text = text;
    };
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
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
                        <Button onClick={handleLogout} variant="contained" sx={{ width: "100px" }}>
                            Logout
                        </Button>
                    </form>
                </ThemeProvider>

                {loading ? (
                    <Stack spacing={1}>
                        <Skeleton animation="wave" width={500} height={100} />
                    </Stack>
                ) : (
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
                )}

                <div className="w-100 flex justify-end">
                    <TablePagination
                        component={"div"}
                        count={paginationInfo.totalDocs}
                        page={page - 1}
                        rowsPerPage={limit}
                        onPageChange={(e, val) => setPage(val + 1)}
                        onRowsPerPageChange={(e) => {
                            setLimit(parseInt(e.target.value, 10));
                            setPage(1);
                        }}
                        rowsPerPageOptions={[5, 10]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
