import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const login = async () => {
    const res = await axios.post("http://127.0.0.1:5001/login", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control mb-2" placeholder="Username"
        onChange={e => setForm({...form, username: e.target.value})} />
      <input className="form-control mb-2" type="password" placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})} />
      <button className="btn btn-primary" onClick={login}>Login</button>
    </div>
  );
}

export default Login;