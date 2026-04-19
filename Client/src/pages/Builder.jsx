import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import PropertiesPanel from "../components/PropertiesPanel";
import SaveButton from "../components/SaveButton";
import { useBuilderStore } from "../store/useBuilderStore";
import { getProjects, getProjectById } from "../api/Project";

export default function Builder() {
  const addComponent = useBuilderStore((s) => s.addComponent);
  const setTree = useBuilderStore((s) => s.setTree);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    getProjects(token)
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]));
  }, [token]);

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const payload = active?.data?.current;
    if (!payload?.type) return;

    if (over.id === "canvas") {
      addComponent("root", {
        id: Date.now().toString(),
        type: payload.type,
        props: { ...payload.props },
        children: [],
      });
    }
  };

  const loadProject = async (projectId) => {
    if (!token) return;
    try {
      const res = await getProjectById(projectId, token);
      const project = res.data;
      if (project?.design) {
        setProjectName(project.name || "");
        setSelectedProjectId(project._id);
        setTree(project.design);
      }
    } catch (error) {
      console.error("Unable to load project", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="bg-slate-100 p-4 gap-4 flex flex-col lg:flex-row items-start">
        <div className="flex flex-col gap-3 w-full lg:w-3/4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
              className="border rounded p-2 flex-1"
            />
            <SaveButton
              projectName={projectName}
              onSaved={(id) => id && setSelectedProjectId(id)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {projects.map((project) => (
              <button
                key={project._id}
                className="px-3 py-2 rounded bg-white border text-sm hover:bg-slate-50"
                onClick={() => loadProject(project._id)}
              >
                Load {project.name}
              </button>
            ))}
          </div>

          <DndContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4">
              <Sidebar />
              <Canvas />
              <PropertiesPanel />
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
