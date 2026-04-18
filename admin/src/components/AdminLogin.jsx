import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = ({ onLoginSuccess }) => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isRegistering ? "/api/admin-auth/register" : "/api/admin-auth/login";
      const data = isRegistering
        ? { adminId, password, email }
        : { adminId, password };

      const response = await axios.post(`http://localhost:5000${endpoint}`, data);

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminId", response.data.admin.adminId);
      onLoginSuccess(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>{isRegistering ? "Register Admin" : "Admin Login"}</h1>

        {error && <div className="admin-error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin ID</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Enter admin ID"
              required
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-login-btn"
          >
            {loading ? "Loading..." : isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <div className="admin-toggle-auth">
          <p>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              className="admin-toggle-btn"
            >
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
