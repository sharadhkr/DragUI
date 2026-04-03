import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import PropertiesPanel from "./components/PropertiesPanel";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}