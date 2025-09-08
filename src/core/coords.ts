import type { Point } from "../data/vallas";

export function normToPixels(quadNorm: Point[], w: number, h: number): Point[] {
  return quadNorm.map(([nx, ny]) => [nx * w, ny * h]);
}

export function pixelsToNorm(quadPx: Point[], w: number, h: number): Point[] {
  return quadPx.map(([x, y]) => [
    Number((x / w).toFixed(4)),
    Number((y / h).toFixed(4)),
  ]);
}

export function approxDestSize(quadPx: Point[]) {
  const dist = (a: Point, b: Point) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const width = (dist(quadPx[0], quadPx[1]) + dist(quadPx[3], quadPx[2])) / 2;
  const height = (dist(quadPx[0], quadPx[3]) + dist(quadPx[1], quadPx[2])) / 2;
  return { width, height };
}
