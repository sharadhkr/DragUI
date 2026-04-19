import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = ({ token, onLogout }) => {
  const [components, setComponents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    props: "",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingComponents, setFetchingComponents] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [adminName, setAdminName] = useState("");

  // Fetch components on mount
  useEffect(() => {
    const name = localStorage.getItem("adminName");
    if (name) setAdminName(name);
    fetchComponents();
  }, [token]);

  const fetchComponents = async () => {
    setFetchingComponents(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/components",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComponents(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching components:", err);
      setError("Failed to fetch components");
      setTimeout(() => setError(""), 3000);
    } finally {
      setFetchingComponents(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Component name is required");
      return false;
    }
    if (!formData.type.trim()) {
      setError("Component type is required");
      return false;
    }
    if (!formData.category.trim()) {
      setError("Category is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("type", formData.type.trim());
      formDataToSend.append("category", formData.category.trim());
      formDataToSend.append("props", formData.props.trim());

      files.forEach((file) => {
        formDataToSend.append("files", file);
      });

      console.log("Creating component...");

      const response = await axios.post(
        "http://localhost:5000/api/admin/component",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Component created:", response.data);

      setSuccess("Component created successfully!");
      setFormData({
        name: "",
        type: "",
        category: "",
        props: "",
      });
      setFiles([]);

      // Refresh components list
      setTimeout(() => {
        fetchComponents();
        setSuccess("");
      }, 1500);
    } catch (err) {
      console.error("Error creating component:", err);
      const errorMsg = err.response?.data?.message || err.message || "Error creating component";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/component/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("Component deleted successfully!");
        fetchComponents();
        setTimeout(() => setSuccess(""), 2000);
      } catch (err) {
        console.error("Error deleting component:", err);
        const errorMsg = err.response?.data?.message || "Error deleting component";
        setError(errorMsg);
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminName");
      onLogout();
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          {adminName && <p className="admin-welcome">Welcome, {adminName}!</p>}
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <div className="admin-content">
        <div className="create-component-section">
          <h2>Create New Component</h2>

          {error && <div className="admin-error-message">{error}</div>}
          {success && <div className="admin-success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="component-form">
            <div className="form-row">
              <div className="form-group">
                <label>Component Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., CustomButton"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Type *</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="e.g., button, card, form"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., UI, Layout, Input"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Props (comma-separated)</label>
                <input
                  type="text"
                  name="props"
                  value={formData.props}
                  onChange={handleInputChange}
                  placeholder="e.g., color,size,disabled"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Upload Files (Optional)</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="file-input"
                disabled={loading}
              />
              {files.length > 0 && (
                <div className="file-list">
                  {files.map((file, idx) => (
                    <span key={idx} className="file-tag">
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !formData.name.trim() || !formData.type.trim() || !formData.category.trim()}
              className="admin-submit-btn"
            >
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Creating...
                </>
              ) : (
                "Create Component"
              )}
            </button>
          </form>
        </div>

        <div className="components-list-section">
          <h2>Components List ({components.length})</h2>

          {fetchingComponents ? (
            <p className="loading-text">Loading components...</p>
          ) : components.length === 0 ? (
            <p className="no-components">No components created yet</p>
          ) : (
            <div className="components-grid">
              {components.map((component) => (
                <div key={component._id} className="component-card">
                  <h3>{component.name}</h3>
                  <div className="component-details">
                    <p>
                      <strong>Type:</strong> {component.type}
                    </p>
                    <p>
                      <strong>Category:</strong> {component.category}
                    </p>
                    {component.props && component.props.length > 0 && (
                      <p>
                        <strong>Props:</strong> {component.props.join(", ")}
                      </p>
                    )}
                    {component.files && component.files.length > 0 && (
                      <p>
                        <strong>Files:</strong> {component.files.length}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(component._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
