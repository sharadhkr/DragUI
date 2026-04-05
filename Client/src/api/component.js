import axios from "axios";

const API = "http://localhost:5000/api";

export const getComponents = () =>
  axios.get(`${API}/component/all`);