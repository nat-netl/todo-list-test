import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // Массив задач
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Вытягиваем данные из бд
    const queryData = query(collection(db, "todos"));
    const unSubFromSnapshot = onSnapshot(queryData, (querySnapshot) => {
      let todosArray = [];
      //Прокидываем данные с бд в стейт с задачами
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    // На этапе размонтирования - вызываем snapshot
    return () => unSubFromSnapshot();
  }, []);

  // Хендл редактирования полей
  const handleEdit = async (todo, newTodo) => {
    // Обновляем данные записи по id
    await updateDoc(doc(db, "todos", todo.id), {
      title: newTodo.title,
      body: newTodo.body,
    });
  };

  // Хендл переключения готовности задачи
  const toggleComplete = async (todo) => {
    // Обновляем готовность задачи по id
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  // Хендл удаления задачи
  const handleDelete = async (id) => {
    // Удаляем задачу из бд по id
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="todo__list">
      {todos.length ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))
      ) : (
        <h2 className="todo__is__empty">Not todo found</h2>
      )}
    </div>
  );
};

export default TodoList;
