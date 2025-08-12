import React, { useState, useEffect } from "react";
import "./TaskManager.css";
import { Plus, Edit2, Trash2 } from "lucide-react";

const TaskManager = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");

  // 🔁 Normalize helper
  const normalize = (arr) =>
    arr.map((t) =>
      typeof t === "string"
      ? { text: t.trim(), status: "pending" }
        : { ...t, text: t.text.trim() }
    );

  // ✅ 1. Load tasks once on mount
  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);
      setTasks(normalize(parsed));
    }
  }, []);

  // ✅ 2. Update sessionStorage on task change
  useEffect(() => {
    const current = sessionStorage.getItem("tasks");
    const currentParsed = current ? normalize(JSON.parse(current)) : [];
    const currentString = JSON.stringify(currentParsed);
    const newString = JSON.stringify(normalize(tasks));

    if (currentString !== newString) {
      sessionStorage.setItem("tasks", newString);
      window.dispatchEvent(new Event("tasks-updated"));
    }
  }, [tasks]);

  // ✅ 3. Listen to external task changes (chatbot or other tabs)
  useEffect(() => {
    const syncTasks = () => {
      const updated = JSON.parse(sessionStorage.getItem("tasks")) || [];
      setTasks(normalize(updated));
    };

    window.addEventListener("tasks-updated", syncTasks);
    window.addEventListener("storage", syncTasks);

    return () => {
      window.removeEventListener("tasks-updated", syncTasks);
      window.removeEventListener("storage", syncTasks);
    };
  }, []);

  const validateTask = (text) => /^[a-zA-Z0-9 ]{1,200}$/.test(text);

  const handleAddOrUpdate = () => {
    if (!validateTask(task)) {
      setError("Only alphanumeric characters allowed. Max 200 characters.");
      return;
    }
    setError("");

    if(tasks.some(t=> t.text.toLowerCase() === task.toLowerCase())){
      setError("task already exists.");
      return;
    }
    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex].text = task;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: task, status: "pending" }]);
    }
    setTask("");
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setTask("");
    }
  };

  return (
    <div className="main-wrapper">
      <div className="task-container">
        <label className="label">Add your task...</label>
        <div className="input-wrapper">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add your task"
          />
          <button onClick={handleAddOrUpdate}>
            <Plus size={16} /> {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <h3 className="task-heading">Your Tasks</h3>
        {tasks.length === 0 ? (
          <div className="no-tasks">No tasks found.</div>
        ) : (
          <ul className="task-list">
            {tasks.map((t, index) => (
              <li key={index}>
                <span className={t.status === "done" ? "task-done" : ""}>
                  {t.text}
                </span>
                <div className="icons">
                  <Edit2
                    size={16}
                    className="icon edit-icon"
                    onClick={() => handleEdit(index)}
                  />
                  <Trash2
                    size={16}
                    className="icon delete-icon"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
