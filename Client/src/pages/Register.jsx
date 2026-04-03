import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });

      alert("Registered successfully ✅");
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div className="p-10 space-y-4">
      <h2 className="text-xl font-bold">Register</h2>

      <input
        placeholder="Email"
        className="border p-2 w-full"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={register}
        className="bg-green-500 text-white p-2 w-full"
      >
        Register
      </button>
    </div>
  );
}