import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { date } from "../helpers/date";
import { v4 as uuid } from "uuid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AddTodo = () => {
  // Хранилище файлов из бд
  const storage = getStorage();
  // Состояния для полей
  const [task, setTask] = useState({
    id: uuid(),
    title: "",
    body: "",
    date: date("-"),
    completed: false,
    file: "",
    urlFile: "",
  });

  // Создаем коллекцию из состояний с данными
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.title !== "" && task.body !== "") {
      if (task.file !== "") {
        const imageRef = ref(storage, `todos/${task.file.name}-${task.id}`);
        await uploadBytes(imageRef, task.file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            setTask({...task, urlFile: url});
          });
        });
      }
      // Добавление данных в бд
      await addDoc(collection(db, "todos"), {
        id: task.id,
        title: task.title,
        body: task.body,
        date: task.date,
        file:
          task.file.name !== undefined ? `${task.file.name}` : "",
        urlFile: task.urlFile,
        completed: task.completed,
        createdAt: date("-"),
      });
    }
  };

  return (
    <form className="add__form" onSubmit={handleSubmit}>
      <div className="inputs__wrapper">
        <input
          type="text"
          className="input__add-text"
          placeholder="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <input
          type="text"
          className="input__add-text"
          placeholder="body"
          value={task.body}
          onChange={(e) => setTask({ ...task, body: e.target.value })}
        />
        <input
          type="date"
          className="input__add-text"
          value={task.date}
          onChange={(e) => setTask({ ...task, date: e.target.value })}
        />
        <input
          className="input__add-file"
          type="file"
          multiple="true"
          onChange={(e) => setTask({ ...task, file: e.target.files[0] })}
        />
      </div>

      <div className="btn__wrapper">
        <button type="submit" className="add__btn">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
