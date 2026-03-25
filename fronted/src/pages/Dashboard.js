import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await axios.get("http://127.0.0.1:5001/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container mt-4">
      <TaskForm refresh={loadTasks} />
      <TaskList tasks={tasks} refresh={loadTasks} />
    </div>
  );
}

export default Dashboard;