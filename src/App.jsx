import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import PropertiesPanel from "./components/PropertiesPanel";
import Shortcuts from "./components/Shortcuts";

export default function App() {
  return (
    <div className="flex">
      <Shortcuts />
      <Sidebar />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}