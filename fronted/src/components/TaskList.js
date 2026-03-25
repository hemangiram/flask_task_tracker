import { useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";




function TaskList({ tasks, refresh }) {
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);



  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure to delete this task?")) return;
    await axios.delete(`http://127.0.0.1:5001/tasks/${id}`);
    refresh();
  };



 const toggleTask = async (id) => {
  try {
    await axios.put(`http://127.0.0.1:5001/tasks/${id}/toggle`);
    refresh();
  } catch (err) {
    console.error("Failed to toggle task", err);
    alert("Failed to toggle task. Try again!");
  }
};

  const openEditModal = (task) => {
  setEditTask(task);
  setShowModal(true);
};

// Already handled: closeModal() only called after short delay

  const closeModal = () => {
    setEditTask(null);
    setShowModal(false);
  };

  return (
    <>
      <ul className="list-group mb-4">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span
              style={{ textDecoration: task.done ? "line-through" : "none", cursor: "pointer" }}
              onClick={() => toggleTask(task.id)}
            >
              {task.text} <span className="badge bg-secondary ms-2">{task.priority}</span>
            </span>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => openEditModal(task)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <TaskForm editTask={editTask} refresh={refresh} closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;