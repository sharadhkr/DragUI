import axios from "axios";

const API = "http://localhost:5000/api";

export const loginAPI = (data) =>
  axios.post(`${API}/auth/login`, data);

export const registerAPI = (data) =>
  axios.post(`${API}/auth/signup`, data);