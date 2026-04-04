import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import PropertiesPanel from "./components/PropertiesPanel";
import Shortcuts from "./components/Shortcuts";
import SaveButton from "./components/savebutton";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GeneratedUI from "./GeneratedUI";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="flex">
      <Shortcuts />
      <Sidebar />
      <Canvas />
      <PropertiesPanel />
      <SaveButton/>
      <Login/>
      <Register/>
      <GeneratedUI/>
      <Admin/>
    </div>
  );
}