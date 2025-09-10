import { useEffect, useRef, useState } from "react";
import type { Valla, Point } from "../data/vallas";
import { cvReady } from "../core/cv/cvReady";
import { warpAndCompose } from "../core/cv/warp";
import { pixelsToNorm } from "../core/coords";

type PreviewProps = {
  valla: Valla;
  userImg?: HTMLImageElement | null;
  editMode?: boolean;
  onQuadChange?: (quadNorm: Point[]) => void;
  showQuad?: boolean;
};

// Spinner interno para no depender de otro archivo
function InlineSpinner() {
  return (
    <div className="absolute inset-0 bg-black/35 backdrop-blur-sm flex items-center justify-center rounded">
      <div className="animate-spin h-10 w-10 border-4 border-white/40 border-t-white rounded-full" />
    </div>
  );
}

export default function Preview({
  valla,
  userImg,
  editMode = false,
  onQuadChange,
  showQuad = false,
}: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bg, setBg] = useState<HTMLImageElement | null>(null);
  const [mask, setMask] = useState<HTMLImageElement | null>(null);
  const [cvOk, setCvOk] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Cargar imágenes cuando cambie la valla
  useEffect(() => {
    const img = new Image();
    img.src = valla.background;
    img.onload = () => setBg(img);

    if (valla.mask) {
      const m = new Image();
      m.src = valla.mask!;
      m.onload = () => setMask(m);
    } else {
      setMask(null);
    }
  }, [valla]);

  // Cargar OpenCV una sola vez
  useEffect(() => {
    cvReady().then(() => setCvOk(true)).catch(console.error);
  }, []);

  // Render principal (fondo + warp + máscara)
  useEffect(() => {
    const run = async () => {
      const canvas = canvasRef.current;
      if (!canvas || !bg || !cvOk) return;

      setProcessing(true);
      try {
        await warpAndCompose(canvas, bg, userImg ?? null, valla.quadNorm, mask ?? null);

        // Dibuja contorno del quad si está habilitado
        if (showQuad) {
          const ctx2 = canvas.getContext("2d")!;
          const toPx = (nx: number, ny: number) => [
            nx * canvas.width,
            ny * canvas.height,
          ] as [number, number];

          const [tl, tr, br, bl] = valla.quadNorm.map(([nx, ny]) =>
            toPx(nx, ny)
          );

          ctx2.save();
          ctx2.strokeStyle = "rgba(59,130,246,0.9)"; // azul
          ctx2.lineWidth = 3;
          ctx2.beginPath();
          ctx2.moveTo(tl[0], tl[1]);
          ctx2.lineTo(tr[0], tr[1]);
          ctx2.lineTo(br[0], br[1]);
          ctx2.lineTo(bl[0], bl[1]);
          ctx2.closePath();
          ctx2.stroke();
          ctx2.restore();
        }
      } finally {
        setProcessing(false);
      }
    };

    run();
  }, [bg, mask, userImg, cvOk, valla, showQuad]);

  // Editor: captura 4 puntos (TL→TR→BR→BL) con coordenadas precisas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !editMode) return;

    const pts: Point[] = [];
    const handler = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (ev.clientX - rect.left) * scaleX;
      const y = (ev.clientY - rect.top) * scaleY;

      pts.push([x, y]);

      // dibujar punto de referencia
      const ctx = canvas.getContext("2d")!;
      ctx.save();
      ctx.fillStyle = "#3B82F6";
      ctx.strokeStyle = "#111827";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      if (pts.length === 4) {
        const quadNorm = pixelsToNorm(pts, canvas.width, canvas.height);
        onQuadChange?.(quadNorm);
      }
    };

    canvas.addEventListener("click", handler);
    return () => canvas.removeEventListener("click", handler);
  }, [editMode, onQuadChange]);

  return (
    <section className="relative bg-gray-900 border border-gray-800 rounded-xl p-2 md:p-3 shadow-xl h-[62vh] min-h-[360px] flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-full max-h-full rounded" />
      {processing && <InlineSpinner />}
    </section>
  );
}
