export function exportCanvasWithWatermark(
  canvas: HTMLCanvasElement,
  watermark: string = "Publilatina · Simulación"
) {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  const ctx = tempCanvas.getContext("2d")!;
  // Copiar el contenido del canvas original
  ctx.drawImage(canvas, 0, 0);

  // Configurar estilo de marca de agua
  const fontSize = Math.floor(canvas.width * 0.025); // escala con el ancho
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)"; // semitransparente
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Repetir watermark en mosaico diagonal
  const stepX = fontSize * 8;
  const stepY = fontSize * 8;

  for (let y = 0; y < canvas.height + stepY; y += stepY) {
    for (let x = 0; x < canvas.width + stepX; x += stepX) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 6); // inclinación 30°
      ctx.fillText(watermark, 0, 0);
      ctx.restore();
    }
  }

  // Crear link de descarga
  const link = document.createElement("a");
  link.download = "simulacion_publilatina.png";
  link.href = tempCanvas.toDataURL("image/png");
  link.click();
}
