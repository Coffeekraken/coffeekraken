import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import * as __rematrix from "rematrix";
function getTranslateProperties($elm) {
  if (!window.getComputedStyle)
    return {
      x: 0,
      y: 0,
      z: 0
    };
  const style = getComputedStyle($elm);
  const transform = style.transform || style.webkitTransform || style.mozTransform || style.msTransform;
  if (!transform)
    return {
      x: 0,
      y: 0,
      z: 0
    };
  const matrix3d = __rematrix.fromString(transform);
  return {
    x: matrix3d[12],
    y: matrix3d[13],
    z: matrix3d[14]
  };
}
var getTranslateProperties_default = getTranslateProperties;
export {
  getTranslateProperties_default as default
};
