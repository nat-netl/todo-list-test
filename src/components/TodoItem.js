import React, { useState } from "react";
import { date } from "../helpers/date";

const TodoItem = ({ todo, toggleComplete, handleDelete, handleEdit }) => {
  // Состояние с измененные данными
  const [newTodo, setNewTodo] = useState({
    title: todo.title,
    body: todo.body,
  });

  // Хендл для обратки измений в полях
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Разрешаем редактировать только если задача не завершена
    if (todo.completed === true) {
      // Если задача завершена прокидываем входные данные
      setNewTodo({ title: newTodo.title, body: newTodo.body });
    } else {
      todo.title = "";
      todo.body = "";

      // Если не завешена то прокидываем данные
      setNewTodo({
        ...newTodo,
        [name]: value,
      });
    }
  };

  return (
    <div
      className="todo__item"
      style={{
        background:
          (new Date(todo.date) < new Date(date("-")) && "#e6dfdd") ||
          (todo.completed && "green"),
      }}
    >
      <div className="info__todo-item">
        <input
          type="text"
          name="title"
          value={todo.title === "" ? newTodo.title : todo.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="body"
          value={todo.body === "" ? newTodo.body : todo.body}
          onChange={handleChange}
        />

        <a href={`${todo.urlFile}`} download>
          Download file - {todo.file}
        </a>

        <small>{todo.date}</small>
      </div>

      <button className="btn-complete" onClick={() => toggleComplete(todo)}>
        Check
      </button>
      <button className="btn-edit" onClick={() => handleEdit(todo, newTodo)}>
        Edit
      </button>
      <button className="btn-delete" onClick={() => handleDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
