import "../../../../../chunk-JETN4ZEY.mjs";
import distanceBetween from "./distanceBetween";
function circleConstrain(center, radius, point) {
  const dist = distanceBetween(center, point);
  if (dist <= radius) {
    return point;
  } else {
    const x = point.x - center.x;
    const y = point.y - center.y;
    const radians = Math.atan2(y, x);
    return {
      x: Math.cos(radians) * radius + center.x,
      y: Math.sin(radians) * radius + center.y
    };
  }
}
var circleConstrain_default = circleConstrain;
export {
  circleConstrain_default as default
};
