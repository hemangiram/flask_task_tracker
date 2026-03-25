import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const register = async () => {
    await axios.post("http://127.0.0.1:5001/register", form);
    alert("User Registered!");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <input className="form-control mb-2" placeholder="Username"
        onChange={e => setForm({...form, username: e.target.value})} />
      <input className="form-control mb-2" type="password" placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})} />
      <button className="btn btn-success" onClick={register}>Register</button>
    </div>
  );
}

export default Register;