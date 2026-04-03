import axios from "axios";
import { useBuilderStore } from "../store/useBuilderStore";

export default function SaveButton() {
  const tree = useBuilderStore((s) => s.tree);

  const save = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/project/save",
      {
        name: "my-project",
        design: tree,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Saved successfully");
  };

  return (
    <button onClick={save} className="bg-green-500 text-white p-2">
      Save
    </button>
  );
}