import { useState, useEffect } from "react";
import axios from "axios";



function TaskForm({ refresh, editTask, closeModal }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  useEffect(() => {
    if (editTask) {
      setText(editTask.text);
      setCategory(editTask.category);
      setPriority(editTask.priority);
      setError("");
      setSuccess("");
    } else {
      setText("");
      setCategory("General");
      setPriority("Medium");
      setError("");
      setSuccess("");
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!text.trim()) {
      setError("Task name cannot be empty!");
      return;
    }

    try {
      if (editTask) {
        // ✅ Edit existing task
       await axios.put(`http://127.0.0.1:5001/tasks/${editTask.id}/edit`, { text, category, priority });
        setSuccess("Task updated successfully!");
        refresh(); // reload list
        setTimeout(() => closeModal(), 700); // show success briefly before closing
      } else {
        // ✅ Add new task
        await axios.post("http://127.0.0.1:5001/tasks", { text, category, priority });
        setSuccess("Task added successfully!");
        setText("");
        setCategory("General");
        setPriority("Medium");
        refresh();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{editTask ? "Edit Task" : "Add New Task"}</h5>

        {/* Success & Error Messages */}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter task name..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="col">
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            {editTask ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;