import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Preview from "./components/Preview";
import { VALLAS, type Valla, type Point } from "./data/vallas";

export default function App() {
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [valla, setValla] = useState<Valla>(VALLAS[0]);

  const handleQuadChange = (q: Point[]) => {
    setValla((prev) => ({ ...prev, quadNorm: q }));
    console.log("Quad NORMALIZADO →", q);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-5">
          <Sidebar
            valla={valla}
            onImageSelected={setLogo}
            editMode={editMode}
            setEditMode={setEditMode}
            onQuadChange={handleQuadChange}
          />
          <Preview
            valla={valla}
            userImg={logo}
            editMode={editMode}
            onQuadChange={handleQuadChange}
          />
        </div>
      </main>
    </div>
  );
}
