import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap"; 

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const getData = () => {
    fetch("http://localhost:4001/alluser")
      .then((res) => res.json())
      .then((info) => setUsers(info));
  };

  useEffect(() => {
    getData();
  }, []);

 
  const handleAddUser = async (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    const res = await fetch("http://localhost:4001/registr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();

  
    setUsers([...users, data]);

    const modalEl = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

   
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleDeleteUser = async (id) => {
  
  await fetch(`http://localhost:4001/deleteuser/${id}`, {
    method: "DELETE",
  });

  
  setUsers(users.filter((user) => user.id !== id));
};


  return (
    <div className="container mt-4">
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add User
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <button
                  className="btn btn-primary  me-3"
                  onClick={() => navigate("/alltodolist")}
                >
                  See Todo List
                </button>
                  <button
          className="btn btn-danger"
          onClick={() => handleDeleteUser(item.id)}
        >
          Delete
        </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form onSubmit={handleAddUser}>
                <div className="mb-3">
                  <label htmlFor="username-input" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email-input" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password-input" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save User
                  </button>
                </div>
              </form>
              {/* Form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
