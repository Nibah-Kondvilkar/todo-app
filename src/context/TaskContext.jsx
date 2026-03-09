import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";
import {collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { query, where} from "firebase/firestore";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

const [tasks,setTasks] = useState([]);


const fetchTasks = async()=>{

const user = auth.currentUser;

if(!user) return;

const q = query(
collection(db,"tasks"),
where("userId","==",user.uid)
);

const data = await getDocs(q);

setTasks(data.docs.map(doc=>({
...doc.data(),
id:doc.id
})));

};

const addTask = async(task)=>{

const user = auth.currentUser;

await addDoc(collection(db,"tasks"),{
...task,
userId: user.uid
});

fetchTasks();

};

const deleteTask = async(id)=>{
await deleteDoc(doc(db,"tasks",id));
fetchTasks();
};


const toggleComplete = async(task)=>{

await updateDoc(doc(db,"tasks",task.id),{
completed: !task.completed
});

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
toggleComplete
}}
>
{children}
</TaskContext.Provider>
);
};