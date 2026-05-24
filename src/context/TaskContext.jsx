import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";
import {collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { query, where} from "firebase/firestore";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

const [tasks,setTasks] = useState([]);


const fetchTasks = async () => {
  const user = auth.currentUser;

  if (!user) return;

  const data = await getDocs(
    collection(db, "users", user.uid, "tasks")
  );

  setTasks(
    data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  );
};

const addTask = async (task) => {
  const user = auth.currentUser;

  if (!user) return;

  await addDoc(
  collection(db, "users", user.uid, "tasks"),
  {
    ...task,
  }
);

  fetchTasks();
};

const deleteTask = async(id)=>{
const user = auth.currentUser;
await deleteDoc(
  doc(db, "users", user.uid, "tasks", id)
);
fetchTasks();
};

const editTask = async (id, updatedTask) => {
  const user = auth.currentUser;

  if (!user) return;

  await updateDoc(
    doc(db, "users", user.uid, "tasks", id),
    updatedTask
  );

  fetchTasks();
};

const toggleComplete = async(task)=>{

const user = auth.currentUser;

await updateDoc(
  doc(db, "users", user.uid, "tasks", task.id),
  {
    completed: !task.completed,
  }
);

fetchTasks();

};

useEffect(()=>{

const unsubscribe = auth.onAuthStateChanged((user)=>{
if(user){
fetchTasks();
}else{
setTasks([]);
}
});

return ()=>unsubscribe();

},[]);

return(
<TaskContext.Provider
value={{
tasks,
addTask,
deleteTask,
editTask,
toggleComplete
}}
>
{children}
</TaskContext.Provider>
);
};