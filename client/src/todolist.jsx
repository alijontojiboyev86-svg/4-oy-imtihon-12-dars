

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newDuration, setNewDuration] = useState("");

  // Fetch all todos
  useEffect(() => {
    fetch("http://localhost:4001/alltodolist")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add new todo
  const handleAddTodo = async () => {
    if (!newTodo || !newTime || !newDuration) return;

    const todoItem = {
      todo: newTodo,
      time: newTime,
      duration_of_work: newDuration,
    };

    const res = await fetch("http://localhost:4001/addtodolist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoItem),
    });
    const data = await res.json();


    setTodos([...todos, data]);

    
    setNewTodo("");
    setNewTime("");
    setNewDuration("");
  };

  // Delet todo
  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:4001/deletetodolist/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>All Todo List</h2>

      {/* Add Todo Form */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="form-control mb-1"
        />
        <input
          type="text"
          placeholder="Time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="form-control mb-1"
        />
        <input
          type="text"
          placeholder="Duration"
          value={newDuration}
          onChange={(e) => setNewDuration(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary mb-3" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>

      {/* Todos Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Todo</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Action</th> {/* Action column */}
          </tr>
        </thead>
        <tbody>
          {todos.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.todo}</td>
              <td>{item.time}</td>
              <td>{item.duration_of_work}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTodo(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
