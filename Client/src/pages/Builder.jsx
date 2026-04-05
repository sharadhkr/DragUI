import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";

export default function Builder() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Canvas />
      </div>
    </div>
  );
}