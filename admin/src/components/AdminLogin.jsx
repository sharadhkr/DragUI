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

  const validateInputs = () => {
    if (!adminId.trim()) {
      setError("Admin ID is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (isRegistering && password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const endpoint = isRegistering ? "/api/admin-auth/register" : "/api/admin-auth/login";
      const payload = isRegistering
        ? { adminId: adminId.trim(), password, email: email.trim() || null }
        : { adminId: adminId.trim(), password };

      console.log(`Attempting ${isRegistering ? "registration" : "login"}...`);

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);

      console.log("Success:", response.data);

      if (response.data.token && response.data.admin) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminId", response.data.admin._id || response.data.admin.adminId);
        localStorage.setItem("adminName", response.data.admin.adminId);

        // Small delay to ensure state updates
        setTimeout(() => {
          onLoginSuccess(response.data.token);
        }, 100);
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Auth error:", err);
      const errorMessage = err.response?.data?.message
        || err.message
        || "An error occurred during authentication";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setAdminId("");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>{isRegistering ? "Register Admin" : "Admin Login"}</h1>

        {error && <div className="admin-error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin ID *</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Enter admin ID"
              disabled={loading}
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email (optional)"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegistering ? "Min 6 characters" : "Enter password"}
              disabled={loading}
            />
            {isRegistering && password && password.length < 6 && (
              <small className="password-hint">Password must be at least 6 characters</small>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !adminId.trim() || !password.trim()}
            className="admin-login-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {isRegistering ? "Registering..." : "Logging in..."}
              </>
            ) : isRegistering ? (
              "Register"
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="admin-toggle-auth">
          <p>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={toggleAuthMode}
              disabled={loading}
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
