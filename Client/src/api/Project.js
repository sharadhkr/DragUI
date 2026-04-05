import axios from "axios";

const API = "http://localhost:5000/api";

export const saveProject = (data, token) =>
  axios.post(`${API}/project/save`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProject = (token) =>
  axios.get(`${API}/project/get`, {
    headers: { Authorization: `Bearer ${token}` },
  });