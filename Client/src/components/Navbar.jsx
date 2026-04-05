import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1>DropUI</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}