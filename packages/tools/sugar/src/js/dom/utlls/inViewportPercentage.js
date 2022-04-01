import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __isVisible from "../isVisible";
function inViewportPercentage(elm) {
  if (!__isVisible(elm))
    return 0;
  const bounding = elm.getBoundingClientRect();
  let percentageWidth = 100, percentageHeight = 100;
  if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
    percentageHeight = 100;
  } else {
    const elmHeight = bounding.bottom - bounding.top;
    if (bounding.top < 0) {
      percentageHeight -= 100 / elmHeight * (bounding.top * -1);
    }
    if (bounding.bottom > window.innerHeight) {
      percentageHeight -= 100 / elmHeight * (bounding.bottom - window.innerHeight);
    }
  }
  percentageHeight = Math.round(percentageHeight);
  if (percentageHeight < 0)
    percentageHeight = 0;
  if (percentageHeight > 100)
    percentageHeight = 100;
  if (bounding.left >= 0 && bounding.right <= window.innerWidth) {
    percentageWidth = 100;
  } else {
    const elmWidth = bounding.right - bounding.left;
    if (bounding.left < 0) {
      percentageWidth -= 100 / elmWidth * (bounding.left * -1);
    }
    if (bounding.right > window.innerWidth) {
      percentageWidth -= 100 / elmWidth * (bounding.right - window.innerWidth);
    }
  }
  percentageWidth = Math.round(percentageWidth);
  if (percentageWidth < 0)
    percentageWidth = 0;
  if (percentageWidth > 100)
    percentageWidth = 100;
  return Math.round(100 / (100 * 100) * (percentageWidth * percentageHeight));
}
var inViewportPercentage_default = inViewportPercentage;
export {
  inViewportPercentage_default as default
};
