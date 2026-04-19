import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const auth = useContext(AuthContext) || {};
  const { logout } = auth;

  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1>DropUI</h1>
      <button
        onClick={logout ?? (() => {})}
        disabled={!logout}
        className="disabled:opacity-50"
      >
        Logout
      </button>
    </div>
  );
}