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
};

export default function Preview({
  valla,
  userImg,
  editMode = false,
  onQuadChange,
}: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bg, setBg] = useState<HTMLImageElement | null>(null);
  const [mask, setMask] = useState<HTMLImageElement | null>(null);
  const [cvOk, setCvOk] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = valla.background;
    img.onload = () => setBg(img);
    if (valla.mask) {
      const m = new Image();
      m.src = valla.mask;
      m.onload = () => setMask(m);
    } else setMask(null);
  }, [valla]);

  useEffect(() => {
    cvReady().then(() => setCvOk(true)).catch(console.error);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !bg || !cvOk) return;
    warpAndCompose(canvas, bg, userImg ?? null, valla.quadNorm, mask ?? null);
  }, [bg, mask, userImg, cvOk, valla]);

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
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#3B82F6";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      if (pts.length === 4) {
        const quadNorm = pixelsToNorm(pts, canvas.width, canvas.height);
        onQuadChange?.(quadNorm);
      }
    };
    canvas.addEventListener("click", handler);
    return () => canvas.removeEventListener("click", handler);
  }, [editMode, onQuadChange]);

  return (
    <section className="bg-gray-900 border border-gray-800 rounded-xl p-2 md:p-3 shadow-xl h-[62vh] min-h-[360px] flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-full max-h-full rounded" />
    </section>
  );
}
