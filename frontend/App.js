import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // add task
  const addTask = async () => {
    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    fetchTasks();
  };

  // delete task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE"
    });
    fetchTasks();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
