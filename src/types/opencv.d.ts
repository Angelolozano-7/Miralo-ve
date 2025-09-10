// Tipos mínimos para usar OpenCV.js como global (cargado por <script>).
declare global {
  interface Window {
    cv: unknown;        // API de OpenCV.js
    Module?: unknown;   // Hook de inicialización de Emscripten
  }
}

export {}; // convierte el archivo en un módulo y evita colisiones
