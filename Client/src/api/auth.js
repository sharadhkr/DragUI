import API from "./index";

// EMAIL LOGIN / REGISTER
export const loginAPI = (data) =>
  API.post("/auth/login", data);

// GOOGLE LOGIN
export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/user/google`;
};

// GITHUB LOGIN
export const githubLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
};