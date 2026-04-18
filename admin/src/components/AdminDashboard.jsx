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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch components on mount
  useEffect(() => {
    fetchComponents();
  }, [token]);

  const fetchComponents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/components",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComponents(response.data);
    } catch (err) {
      console.error("Error fetching components:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("props", formData.props);

      files.forEach((file) => {
        formDataToSend.append("files", file);
      });

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

      setSuccess("Component created successfully!");
      setFormData({
        name: "",
        type: "",
        category: "",
        props: "",
      });
      setFiles([]);
      fetchComponents();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating component");
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
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError(err.response?.data?.message || "Error deleting component");
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="logout-btn">
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
                  required
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
                  required
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
                  required
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
                />
              </div>
            </div>

            <div className="form-group">
              <label>Upload Files</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="file-input"
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
              disabled={loading}
              className="admin-submit-btn"
            >
              {loading ? "Creating..." : "Create Component"}
            </button>
          </form>
        </div>

        <div className="components-list-section">
          <h2>Components List ({components.length})</h2>

          {components.length === 0 ? (
            <p className="no-components">No components created yet</p>
          ) : (
            <div className="components-grid">
              {components.map((component) => (
                <div key={component._id} className="component-card">
                  <h3>{component.name}</h3>
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
