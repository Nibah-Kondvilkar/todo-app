import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm({ setShowForm, editTaskData = null }) {
  const { addTask, editTask } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (editTaskData) {
      setTitle(editTaskData.title || "");
      setCategory(editTaskData.category || "Work");
      setPriority(editTaskData.priority || "Medium");
      setDeadline(editTaskData.deadline || "");
    }
  }, [editTaskData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter task title");
      return;
    }

    const taskData = {
      title,
      category,
      priority,
      deadline,
      completed: editTaskData?.completed || false,
    };

    if (editTaskData) {
      editTask(editTaskData.id, taskData);
    } else {
      addTask(taskData);
    }

    setTitle("");
    setCategory("Work");
    setPriority("Medium");
    setDeadline("");

    setShowForm(false);
    setSelectedTask(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {editTaskData ? "Edit Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <label>Task Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
        </select>

        <label>Priority</label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Deadline</label>

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 rounded"
        />

        <button className="bg-green-500 text-white p-2 rounded">
          {editTaskData ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;