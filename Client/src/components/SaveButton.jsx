import { saveProject } from "../api/Project";
import { useBuilderStore } from "../store/useBuilderStore";

export default function SaveButton({ projectName, onSaved }) {
  const tree = useBuilderStore((s) => s.tree);

  const save = async () => {
    if (!projectName) {
      alert("Please enter a project name before saving.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      return;
    }

    try {
      const res = await saveProject(
        {
          name: projectName,
          design: tree,
        },
        token
      );

      if (res?.data?._id) {
        onSaved?.(res.data._id);
      }

      alert("Saved successfully");
    } catch (error) {
      console.error(error);
      alert("Save failed. Please try again.");
    }
  };

  return (
    <button onClick={save} className="bg-green-500 text-white p-2">
      Save
    </button>
  );
}