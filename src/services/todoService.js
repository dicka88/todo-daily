import { getDocs, collection, query, where, setDoc, addDoc, doc, getDoc, updateDoc, deleteDoc, orderBy, FieldPath, documentId } from "firebase/firestore";
import { db } from "../config/firebase";

const todosRef = collection(db, "todos");

const getTodos = async (uid) => {
  const querySnapshot = await getDocs(query(todosRef, orderBy(documentId()), where('uid', '==', uid)));

  const todos = [];
  querySnapshot.forEach((doc) => {
    const { task, description, completed, createdAt, date } = doc.data();

    todos.push({
      id: doc.id,
      task,
      description,
      completed,
      date,
      createdAt: createdAt?.toDate()
    });
  });

  return todos;
};

const getTodosByDate = async (date) => {
  const q = query(todosRef, where("date", "==", date));
  const querySnapshot = await getDocs(q);

  const todos = [];
  querySnapshot.forEach(doc => {
    const { task, description, completed, time } = doc.data();

    todos.push({
      id: doc.id,
      task,
      description,
      completed,
      time: time.toDate()
    });
  });

  return todos;
};

const getTodoById = async (id) => {
  const ref = doc(db, "todos", id);
  const document = await getDoc(ref);
  if (!document.exists()) return null;
  return document.data();
};

const addTodo = async (data) => {
  const res = await addDoc(todosRef, data);
  return res;
};

const updateTodo = async (id, data) => {
  const ref = doc(db, "todos", id);

  await updateDoc(ref, data);
};

const removeTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};

export const todoService = {
  getTodos,
  getTodosByDate,
  getTodoById,
  addTodo,
  updateTodo,
  removeTodo
};