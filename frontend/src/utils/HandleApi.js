//import axios from "axios";

const baseUrl = "http://localhost:5000";

// const getAllTodo = (setTodo) => {
//   axios
//     .get(baseUrl)
//     .then(({ data }) => {
//       setTodo(data);
//     })
//     .catch((err) => console.log(err));
// };

const getAllTodo = async (setTodo) => {
  try {
    const data = await fetch(baseUrl);
    const json = await data.json();
    setTodo(json);
  } catch (err) {
    console.log(err);
  }
};

// const addTodo = (text, setText, setTodo) => {
//   axios
//     .post(`${baseUrl}/save`, { text })
//     .then((data) => {
//       setText("");
//       getAllTodo(setTodo);
//     })
//     .catch((err) => console.log(err));
// };

const addTodo = async (text, setText, setTodo) => {
  try {
    const data = await fetch(`${baseUrl}/save`, {
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

// const updateTodo = (todoId, text, setText, setTodo, setIsUpdating) => {
//   axios
//     .post(`${baseUrl}/update`, { _id: todoId, text })
//     .then((data) => {
//       setText("");
//       setIsUpdating(false);
//       getAllTodo(setTodo);
//     })
//     .catch((err) => console.log(err));
// };

const updateTodo = async (todoId, text, setText, setTodo, setIsUpdating) => {
  try {
    const data = await fetch(`${baseUrl}/update`, {
      method: "POST",
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

// const deleteTodo = (_id, setTodo) => {
//   axios
//     .post(`${baseUrl}/delete`, { _id })
//     .then((data) => {
//       getAllTodo(setTodo);
//     })
//     .catch((err) => console.log(err));
// };

const deleteTodo = async (_id, setTodo) => {
  try {
    const data = await fetch(`${baseUrl}/delete`, {
      method: "POST",
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
