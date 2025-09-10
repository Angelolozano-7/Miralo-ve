import Uploader from "./Uploader";
import type { Valla, Point } from "../data/vallas";
import { exportCanvasWithWatermark } from "../core/exportCanvas";

type SidebarProps = {
  valla: Valla;
  onImageSelected: (img: HTMLImageElement) => void;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  onQuadChange: (q: Point[]) => void;
};

export default function Sidebar({
  valla,
  onImageSelected,
  editMode,
  setEditMode,
}: SidebarProps) {
  const handleExport = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      exportCanvasWithWatermark(canvas as HTMLCanvasElement);
    }
  };

  return (
    <aside className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-5 shadow-lg">
      <h2 className="text-white font-medium mb-3">Controles</h2>

      {/* Selector de valla */}
      <div className="space-y-1 mb-4">
        <label className="text-sm text-gray-400">Plantilla de valla</label>
        <select
          className="w-full bg-gray-800/80 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 outline-none"
          defaultValue={valla.id}
          disabled
        >
          <option value={valla.id}>{valla.nombre}</option>
        </select>
      </div>

      {/* Uploader */}
      <div className="space-y-2 mb-5">
        <label className="text-sm text-gray-400">Creativo / logo</label>
        <Uploader onImageSelected={onImageSelected} />
        <p className="text-xs text-gray-500">JPG/PNG hasta 8MB</p>
      </div>

      {/* Editor toggle */}
      <label className="flex items-center gap-2 text-sm text-gray-300">
        <input
          type="checkbox"
          checked={editMode}
          onChange={(e) => setEditMode(e.target.checked)}
        />
        Modo editor (clic en 4 esquinas)
      </label>

      {editMode && (
        <div className="mt-3 text-xs text-gray-400">
          <p>Orden: <b>TL → TR → BR → BL</b>.</p>
          <p>Coords se guardan en consola; copia en vallas.ts</p>
        </div>
      )}

      {/* Botón exportar */}
      <div className="mt-5 flex gap-2">
        <button
          onClick={handleExport}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2 transition"
        >
          Descargar PNG
        </button>
      </div>
    </aside>
  );
}
