import { useState } from "react";
import Uploader from "./Uploader";
import { VALLAS, type Valla, type Point } from "../data/vallas";
import { exportCanvasWithWatermark } from "../core/exportCanvas";

type SidebarProps = {
  valla: Valla;
  setValla: (v: Valla) => void;
  onImageSelected: (img: HTMLImageElement) => void;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  showQuad: boolean;
  setShowQuad: (v: boolean) => void;
  onQuadChange?: (q: Point[]) => void; // no se usa aquí, pero lo dejamos por si lo necesitas
};

export default function Sidebar({
  valla,
  setValla,
  onImageSelected,
  editMode,
  setEditMode,
  showQuad,
  setShowQuad,
}: SidebarProps) {
  const [quality, setQuality] = useState(1);

  const handleExport = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    // nombre con id de valla + timestamp
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const fileName = `sim_${valla.id}_${ts}`;

    exportCanvasWithWatermark(canvas as HTMLCanvasElement, {
      scale: quality,
      fileName,
      watermark: "Publilatina · Simulación",
    });
  };

  return (
    <aside className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-5 shadow-lg">
      <h2 className="text-white font-medium mb-3">Controles</h2>

      {/* Selector de valla */}
      <div className="space-y-1 mb-4">
        <label className="text-sm text-gray-400">Plantilla de valla</label>
        <select
          className="w-full bg-gray-800/80 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 outline-none"
          value={valla.id}
          onChange={(e) => {
            const nueva = VALLAS.find((v) => v.id === e.target.value);
            if (nueva) setValla(nueva);
          }}
        >
          {VALLAS.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Uploader */}
      <div className="space-y-2 mb-5">
        <label className="text-sm text-gray-400">Creativo / logo</label>
        <Uploader onImageSelected={onImageSelected} />
        <p className="text-xs text-gray-500">JPG/PNG hasta 8MB</p>
      </div>

      
      <div className="space-y-2 mb-5">
      {/* Toggles 
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={editMode}
            onChange={(e) => setEditMode(e.target.checked)}
          />
          Modo editor (clic en 4 esquinas)
        </label>*/}

        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={showQuad}
            onChange={(e) => setShowQuad(e.target.checked)}
          />
          Ver contorno del área
        </label>
      </div>

      {/* Exportación */}
      <div className="mt-2 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Calidad de exportación</label>
          <select
            className="bg-gray-800/80 text-gray-100 border border-gray-700 rounded px-2 py-1"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
          </select>
        </div>

        <button
          onClick={handleExport}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2 transition"
        >
          Descargar PNG
        </button>
      </div>

      <p className="mt-4 text-[11px] leading-4 text-gray-500">
        Privacidad: Ningún dato será recogido por nuestro aplicativo.
      </p>
    </aside>
  );
}
