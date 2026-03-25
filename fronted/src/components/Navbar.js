import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Task Manager</Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          <Link className="btn btn-outline-light me-2" to="/about">About</Link>
          <Link className="btn btn-outline-info me-2" to="/dashboard">Dashboard</Link>
          <Link className="btn btn-success me-2" to="/login">Login</Link>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;