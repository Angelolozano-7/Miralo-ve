import Uploader from "./Uploader";
import type { Valla, Point } from "../data/vallas";

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
  onQuadChange,
}: SidebarProps) {
  return (
    <aside className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-5 shadow-lg">
      <h2 className="text-white font-medium mb-3">Controles</h2>

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

      <div className="space-y-2 mb-5">
        <label className="text-sm text-gray-400">Creativo / logo</label>
        <Uploader onImageSelected={onImageSelected} />
        <p className="text-xs text-gray-500">JPG/PNG hasta 8MB</p>
      </div>

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
          <p>Al terminar, coords se guardan en consola para pegarlas en vallas.ts</p>
        </div>
      )}
    </aside>
  );
}
