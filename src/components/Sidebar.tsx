import { useState } from "react";
import Uploader from "./Uploader";
import { VALLAS, type Valla, type Point } from "../data/vallas";
import {
  exportCanvasWithWatermarkDownload as exportCanvasWithWatermark,
  exportCanvasWithWatermarkOpenInNewTab,
} from "../core/exportCanvas";

type SidebarProps = {
  valla: Valla;
  setValla: (v: Valla) => void;
  onImageSelected: (img: HTMLImageElement) => void;
  editMode: boolean;               // recibido pero no utilizado aquí (mantén la prop si el padre la usa)
  setEditMode: (v: boolean) => void; // idem
  showQuad: boolean;
  setShowQuad: (v: boolean) => void;
  onQuadChange?: (q: Point[]) => void; // reservado para futuro uso
};

export default function Sidebar({
  valla,
  setValla,
  onImageSelected,
  showQuad,
  setShowQuad,
}: SidebarProps) {
  const [quality, setQuality] = useState<number>(1);

  const getCanvas = (): HTMLCanvasElement | null =>
    document.querySelector("canvas");

  const buildFileName = () => {
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    return `sim_${valla.id}_${ts}`;
  };

  const handleExportDownload = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    exportCanvasWithWatermark(canvas, {
      scale: quality,
      fileName: buildFileName(),
      watermark: "Publilatina · Simulación",
    });
  };

  const handleExportOpenNewTab = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    exportCanvasWithWatermarkOpenInNewTab(canvas, {
      scale: quality,
      fileName: buildFileName(),
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

      {/* Toggles */}
      <div className="space-y-2 mb-5">
        {/* 
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={editMode}
            onChange={(e) => setEditMode(e.target.checked)}
          />
          Modo editor (clic en 4 esquinas)
        </label>
        */}
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
            onChange={(e) => setQuality(parseInt(e.target.value, 10))}
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleExportDownload}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2 transition"
            title="Descarga directa (puede estar bloqueada dentro de algunos iframes)"
          >
            Descargar PNG
          </button>

          <button
            onClick={handleExportOpenNewTab}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-3 py-2 transition"
            title="Abre la imagen en una pestaña nueva por si la descarga directa está bloqueada"
          >
            Abrir en pestaña
          </button>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-4 text-gray-500">
        ¿Problemas para descargar dentro del sitio? Usa <b>“Abrir en pestaña”</b> y guarda la imagen.
        <br />
        Privacidad: ningún dato es almacenado por este aplicativo.
      </p>
    </aside>
  );
}
