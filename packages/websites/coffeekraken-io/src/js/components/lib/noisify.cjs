import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var noisify_exports = {};
__export(noisify_exports, {
  default: () => noiseCanvas
});
module.exports = __toCommonJS(noisify_exports);
function noiseCanvas(canvasSlt, noiseFn, config = {}) {
  const canvas = typeof canvasSlt === "string" && document ? document.querySelector(canvasSlt) : canvasSlt;
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");
  const pixelData = new Uint8ClampedArray(width * height * 4);
  let functs = [];
  let isRGBA = false;
  if (typeof noiseFn === "object") {
    isRGBA = true;
    for (let i = 0; i < 4; i++) {
      if (noiseFn[i]) {
        functs[i] = (x, y) => 255 * (noiseFn[i](x, y) + 1) / 2;
      } else {
        functs[i] = () => 255;
      }
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let pixel;
      if (isRGBA) {
        pixel = new Uint8Array(functs.map((fn) => fn(x, y)));
      } else {
        const n = 255 * (noiseFn(x, y) + 1) / 2;
        pixel = new Uint8Array([n, n, n, 255]);
      }
      pixelData.set(pixel, x * 4 + y * 4 * width);
    }
  }
  ctx.putImageData(new ImageData(pixelData, width, height), 0, 0);
}
