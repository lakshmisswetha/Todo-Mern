import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { addTodo, getAllTodo } from "./utils/HandleApi";

const App = () => {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    getAllTodo(setTodo);
  }, []);

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
            onClick={() => addTodo(text, setText, setTodo)}
            className="add cursor-pointer px-[1.5rem] py-[0.5rem] bg-black text-white"
          >
            Add
          </div>
        </div>
        <div className="list">
          {todo.map((item) => (
            <Todo key={item._id} text={item.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
