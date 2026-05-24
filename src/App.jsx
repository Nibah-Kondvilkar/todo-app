import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import { TaskProvider } from "./context/TaskContext";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {

const [user,setUser] = useState(null);
const [showLogin,setShowLogin] = useState(true);
const [filter,setFilter] = useState("all");
const [showForm,setShowForm] = useState(false);
const [isRegistering, setIsRegistering] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (!isRegistering) {
      setUser(currentUser);
    }
  });

  return () => unsubscribe();
}, [isRegistering]);


// Logout
const logout = async ()=>{
await signOut(auth);
setUser(null);
};


// Login/Register page
if(!user){

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<div className="bg-white p-8 rounded-lg shadow-md w-96 ">

<h1 className="text-2xl font-bold text-center mb-6">
Task Manager
</h1>

{showLogin ? (

<>

<Login setUser={setUser}/>

<p className="text-center mt-4">

Don't have an account?

<button
className="text-blue-500 ml-2"
onClick={()=>setShowLogin(false)}
>
Register
</button>

</p>

</>

) : (

<>

<Register
  setShowLogin={setShowLogin}
  setIsRegistering={setIsRegistering}
/>

<p className="text-center mt-4">

Already have an account?

<button
className="text-blue-500 ml-2"
onClick={()=>setShowLogin(true)}
>
Login
</button>

</p>

</>

)}

</div>

</div>

);

}


// Main Todo App UI
return(

<TaskProvider>

<div className="min-h-screen bg-gray-100 p-6">

<div className="max-w-xl mx-auto">

<div className="flex justify-between items-center mb-6">

<h1 className="text-3xl font-bold">
Task Manager
</h1>



</div>

<div className="flex justify-between items-center mb-4">

<button 
onClick={() => {
  setSelectedTask(null);
  setShowForm(!showForm);
}}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
{showForm ? "Close" : "Add Task"}
</button>

<Filter setFilter={setFilter}/>

</div>

{showForm && <TaskForm setShowForm={setShowForm} editTaskData={selectedTask}
    setSelectedTask={setSelectedTask}/>}


<TaskList filter={filter} setShowForm={setShowForm}
  setSelectedTask={setSelectedTask}/>

<button
onClick={logout}
className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
>
Logout
</button>

</div>

</div>

</TaskProvider>

);

}

export default App;