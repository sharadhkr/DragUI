import { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [type, setType] = useState("");
  const [label, setLabel] = useState("");

  const addComponent = async () => {
    await axios.post("http://localhost:5000/api/component/add", {
      type,
      label,
      defaultProps: {
        text: "New Component",
        className: "p-2 border",
      },
      propsSchema: {
        text: { type: "text" },
        className: { type: "text" },
      },
    });

    alert("Component Added 🚀");
  };

  return (
    <div className="p-10 space-y-4">
      <input
        placeholder="Component Type (e.g Button)"
        onChange={(e) => setType(e.target.value)}
        className="border p-2"
      />

      <input
        placeholder="Label"
        onChange={(e) => setLabel(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={addComponent}
        className="bg-green-500 text-white p-2"
      >
        Add Component
      </button>
    </div>
  );
}