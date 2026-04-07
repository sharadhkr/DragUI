import { useState, useContext } from "react";
import { loginAPI, googleLogin, githubLogin } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 🔥 EMAIL LOGIN / REGISTER
  const handleEmailLogin = async () => {
    try {
      const res = await loginAPI(form);

      login(res.data.token); // save token in context + localStorage
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96 space-y-4">

        <h2 className="text-2xl font-bold text-center">
          DropUI Login
        </h2>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD INPUT */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* EMAIL LOGIN */}
        <button
          onClick={handleEmailLogin}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Continue with Email
        </button>

        <div className="text-center text-gray-400">OR</div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={googleLogin}
          className="bg-red-500 text-white w-full p-2 rounded"
        >
          Continue with Google
        </button>

        {/* GITHUB LOGIN */}
        <button
          onClick={githubLogin}
          className="bg-gray-800 text-white w-full p-2 rounded"
        >
          Continue with GitHub
        </button>

      </div>
    </div>
  );
}