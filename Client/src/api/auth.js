import API from "./index";

// EMAIL LOGIN / REGISTER
export const loginAPI = (data) =>
  API.post("/auth/login", data);

// GOOGLE LOGIN
export const googleLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/google";
};

// GITHUB LOGIN
export const githubLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/github";
};