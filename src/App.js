import "./style.css";

import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <div className="title">
          <h1>Todos</h1>
        </div>

        <div className="add">
          <AddTodo />
        </div>

        <div className="todos">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default App;
