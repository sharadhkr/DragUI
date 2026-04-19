import axios from "axios";

const API = "http://localhost:5000/api";

export const saveProject = (data, token) =>
  axios.post(`${API}/project/save`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProjects = (token) =>
  axios.get(`${API}/project/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProjectById = (projectId, token) =>
  axios.get(`${API}/project/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });