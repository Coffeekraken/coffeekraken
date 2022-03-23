import "../../../../../chunk-JETN4ZEY.mjs";
function distanceBetween(point1, point2) {
  let xs = 0;
  let ys = 0;
  xs = point2.x - point1.x;
  xs = xs * xs;
  ys = point2.y - point1.y;
  ys = ys * ys;
  return Math.sqrt(xs + ys);
}
var distanceBetween_default = distanceBetween;
export {
  distanceBetween_default as default
};
