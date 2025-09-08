import type { Point } from "../../data/vallas";
import { normToPixels } from "../coords";

async function imageToImageData(img: HTMLImageElement) {
  const off = document.createElement("canvas");
  off.width = img.naturalWidth;
  off.height = img.naturalHeight;
  const ctx = off.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, off.width, off.height);
}

export async function warpAndCompose(
  canvas: HTMLCanvasElement,
  bgImg: HTMLImageElement,
  userImg: HTMLImageElement | null,
  quadNorm: Point[],
  maskImg?: HTMLImageElement | null
) {
  const w = window as any;
  const cv = w.cv as typeof import("opencv");
  const ctx = canvas.getContext("2d")!;

  canvas.width = bgImg.naturalWidth;
  canvas.height = bgImg.naturalHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  if (!userImg) {
    if (maskImg) ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
    return;
  }

  const bgMat = cv.imread(canvas);
  const srcData = await imageToImageData(userImg);
  const src = cv.matFromImageData(srcData);

  const dstQuadPx = normToPixels(quadNorm, canvas.width, canvas.height);

  const srcQuad = new cv.Mat(4, 1, cv.CV_32FC2);
  const dstQuad = new cv.Mat(4, 1, cv.CV_32FC2);

  srcQuad.data32F.set([0, 0, src.cols, 0, src.cols, src.rows, 0, src.rows]);
  dstQuad.data32F.set([
    dstQuadPx[0][0], dstQuadPx[0][1],
    dstQuadPx[1][0], dstQuadPx[1][1],
    dstQuadPx[2][0], dstQuadPx[2][1],
    dstQuadPx[3][0], dstQuadPx[3][1],
  ]);

  const H = cv.getPerspectiveTransform(srcQuad, dstQuad);

  const warped = new cv.Mat();
  cv.warpPerspective(
    src,
    warped,
    H,
    new cv.Size(canvas.width, canvas.height),
    cv.INTER_LINEAR,
    cv.BORDER_CONSTANT,
    new cv.Scalar(0, 0, 0, 0)
  );

  const rgba = new cv.MatVector();
  cv.split(warped, rgba);
  const alpha = rgba.get(3);
  warped.copyTo(bgMat, alpha);

  cv.imshow(canvas, bgMat);

  if (maskImg) {
    ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
  }

  src.delete(); warped.delete(); rgba.delete();
  alpha.delete(); srcQuad.delete(); dstQuad.delete();
  H.delete(); bgMat.delete();
}
