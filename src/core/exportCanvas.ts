export function exportCanvasWithWatermark(
  canvas: HTMLCanvasElement,
  opts?: {
    watermark?: string;
    scale?: number;      // 1 = tamaño original, 2 = el doble
    fileName?: string;   // sin extensión
  }
) {
  const watermark = opts?.watermark ?? "Publilatina · Simulación";
  const scale = Math.max(1, Math.floor(opts?.scale ?? 1));
  const fileName = (opts?.fileName ?? "simulacion_publilatina") + ".png";

  // Canvas escalado para exportar en mayor calidad
  const out = document.createElement("canvas");
  out.width  = canvas.width * scale;
  out.height = canvas.height * scale;
  const ctx = out.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Copiar el render principal
  ctx.drawImage(canvas, 0, 0, out.width, out.height);

  // Watermark en mosaico diagonal
  const fontSize = Math.floor(out.width * 0.025);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const stepX = fontSize * 8;
  const stepY = fontSize * 8;

  for (let y = 0; y < out.height + stepY; y += stepY) {
    for (let x = 0; x < out.width + stepX; x += stepX) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 6);
      ctx.fillText(watermark, 0, 0);
      ctx.restore();
    }
  }

  // Descargar
  const link = document.createElement("a");
  link.download = fileName;
  link.href = out.toDataURL("image/png");
  link.click();
}
