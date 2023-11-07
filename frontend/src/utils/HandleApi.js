import axios from "axios";

const baseUrl = "http://localhost:5000";

const getAllTodo = (setTodo) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log("data --->", data);
    setTodo(data);
  });
};

const addTodo = (text, setText, setTodo) => {
  axios.post(`${baseUrl}/save`, { text }).then((data) => {
    console.log(data);
    setText("");
    getAllTodo(setTodo);
  });
};

export { getAllTodo, addTodo };
