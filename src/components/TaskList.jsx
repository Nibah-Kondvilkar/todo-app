import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({filter, setShowForm,
  setSelectedTask,}){

const { tasks, deleteTask, toggleComplete, editTask } = useContext(TaskContext);

const priorityOrder = {
High: 1,
Medium: 2,
Low: 3
};

const filtered = (filter === "all"
? tasks
: tasks.filter(task => task.category === filter)
).sort((a,b)=>{

if(priorityOrder[a.priority] !== priorityOrder[b.priority]){
return priorityOrder[a.priority] - priorityOrder[b.priority];
}

return new Date(a.deadline) - new Date(b.deadline);

});


if (filtered.length === 0) {
  return (
    <div>
      {tasks.length === 0 ? (
        <>
          <div className="flex justify-between mb-4 text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
            <p>Total: 0</p>
            <p>Completed: 0</p>
            <p>Pending: 0</p>
          </div>

          <div className="text-center text-gray-500 mt-6">
            No tasks yet. Add your first task 🚀
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-6">
          No tasks found in this category
        </div>
      )}
    </div>
  );
}

return(
<div>

    <div className="flex justify-between mb-4 text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
        <p>Total: {filtered.length}</p>

        <p>
            Completed: {filtered.filter(task => task.completed).length}
        </p>

        <p>
            Pending: {filtered.filter(task => !task.completed).length}
        </p>
   </div>

{filtered.map((task)=>{

const priorityColors = {
High: "text-red-500",
Medium: "text-yellow-500",
Low: "text-green-500",
};

const priorityColor = priorityColors[task.priority];

return(

<div
key={task.id}
className={`bg-white shadow-md p-4 rounded-lg mb-4 flex justify-between items-center ${
task.completed ? "opacity-60" : ""
}`}>

<div>

<h3
className={`text-lg font-semibold ${
task.completed ? "line-through text-gray-400" : ""
}`}
>
{task.title}
</h3>

<p className="text-sm text-gray-500">
Category: {task.category}
</p>

<p className={`text-sm font-medium ${priorityColor}`}>
Priority: {task.priority}
</p>

{task.deadline && (

<p className="text-sm text-gray-500">
Deadline: {task.deadline}
</p>

)}

</div>

<div className="flex gap-2">

<button
onClick={()=>toggleComplete(task)}
className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-green-600"
>
{task.completed ? "Undo" : "Done"}
</button>

<button
  onClick={() => {
    setSelectedTask(task);
    setShowForm(true);
  }}
  className="bg-indigo-400 px-2 py-1 rounded text-white hover:bg-violet-600"
>
  Edit
</button>

<button
onClick={()=>deleteTask(task.id)}
className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-red-600"
>
  Delete
</button>

</div>

</div>

);

})}

</div>

);

}

export default TaskList;