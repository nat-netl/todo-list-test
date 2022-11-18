import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGP8AyTvheo8fmZw7o7RreZ5tu09rsXzg",
  authDomain: "todo-list-test-f473b.firebaseapp.com",
  projectId: "todo-list-test-f473b",
  storageBucket: "todo-list-test-f473b.appspot.com",
  messagingSenderId: "242666157372",
  appId: "1:242666157372:web:abf3dca4832f504a3d9a39",
  measurementId: "G-5F5ETNGT3Q",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
