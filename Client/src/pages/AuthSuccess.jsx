import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthSuccess() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      login(token); // 🔥 THIS SAVES TOKEN
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <div className="p-10">Logging you in...</div>;
}