import { useState } from "react";
import { registerAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await registerAPI(form);

      alert("Account created ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleRegister}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Register
        </button>

        <p
          className="text-sm text-center cursor-pointer text-blue-500"
          onClick={() => navigate("/login")}
        >
          Already have account?
        </p>
      </div>
    </div>
  );
}