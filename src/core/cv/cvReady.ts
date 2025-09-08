export function cvReady(): Promise<void> {
  return new Promise((resolve, reject) => {
    const w = window as any;

    if (w.cv && w.cv.Mat) {
      // Ya está cargado
      return resolve();
    }

    if (document.querySelector("script[src='/cv/opencv.js']")) {
      // Script ya inyectado, esperar a que termine
      const check = setInterval(() => {
        if (w.cv && w.cv.Mat) {
          clearInterval(check);
          resolve();
        }
      }, 50);
      return;
    }

    const s = document.createElement("script");
    s.src = "/cv/opencv.js";
    s.async = true;
    w.Module = { onRuntimeInitialized: () => resolve() };
    s.onerror = () => reject(new Error("No se pudo cargar OpenCV.js"));
    document.head.appendChild(s);
  });
}
