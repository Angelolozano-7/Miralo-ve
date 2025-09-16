// src/core/exportCanvas.ts
type ExportOpts = {
  watermark?: string;
  scale?: number;    // 1 = tamaño original, 2 = el doble
  fileName?: string; // sin extensión
};

/** Genera el canvas escalado con watermark y lo devuelve */
function buildWatermarkedCanvas(
  canvas: HTMLCanvasElement,
  opts?: ExportOpts
): HTMLCanvasElement {
  const watermark = opts?.watermark ?? "Publilatina · Simulación";
  const scale = Math.max(1, Math.round(opts?.scale ?? 1));
  const out = document.createElement("canvas");
  out.width = canvas.width * scale;
  out.height = canvas.height * scale;

  const ctx = out.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Copiar el render principal
  ctx.drawImage(canvas, 0, 0, out.width, out.height);

  // Watermark en mosaico diagonal
  const fontSize = Math.floor(out.width * 0.025);
  ctx.font = `${fontSize}px Arial, sans-serif`;
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

  return out;
}

/** Utilidad: canvas -> Blob */
function canvasToBlob(canvas: HTMLCanvasElement, type = "image/png", quality?: number): Promise<Blob> {
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b as Blob), type, quality);
  });
}

/** A) Descarga directa (puede fallar en iframes sin allow-downloads) */
export async function exportCanvasWithWatermarkDownload(
  canvas: HTMLCanvasElement,
  opts?: ExportOpts
) {
  const fileName = (opts?.fileName ?? "simulacion_publilatina") + ".png";
  const out = buildWatermarkedCanvas(canvas, opts);
  const blob = await canvasToBlob(out, "image/png", 0.92);
  const url = URL.createObjectURL(blob);

  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    // Necesario para Safari/iOS a veces:
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click(); // <— ojo: click en minúsculas
    a.remove();
  } finally {
    // Limpieza
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
}

/** B) Fallback universal: abrir pestaña nueva y descargar desde allí */
export async function exportCanvasWithWatermarkOpenInNewTab(
  canvas: HTMLCanvasElement,
  opts?: ExportOpts
) {
  const fileName = (opts?.fileName ?? "simulacion_publilatina") + ".png";

  // Abre la ventana *antes* de generar el blob para evitar bloqueos de popup
  const win = window.open("", "_blank", "noopener,noreferrer");

  const out = buildWatermarkedCanvas(canvas, opts);
  const blob = await canvasToBlob(out, "image/png", 0.92);
  const url = URL.createObjectURL(blob);

  if (win && !win.closed) {
    // Intenta forzar descarga desde la pestaña nueva (ya no está sandboxed)
    const a = win.document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.textContent = "Descargar imagen";
    // Opcional: estilo mínimo para evitar pestaña en blanco
    const p = win.document.createElement("p");
    p.textContent = "Preparando descarga… Si no inicia, haz clic en el enlace:";
    win.document.body.appendChild(p);
    win.document.body.appendChild(a);
    a.click();

    // Limpieza y cierre “suave”
    setTimeout(() => {
      URL.revokeObjectURL(url);
      try { win.close(); } catch { /* empty */ }
    }, 1500);
  } else {
    // Si el popup fue bloqueado: al menos abre la imagen (usuario puede Guardar como…)
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}
