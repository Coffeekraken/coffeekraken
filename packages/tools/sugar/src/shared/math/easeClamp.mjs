import "../../../../../chunk-JETN4ZEY.mjs";
import __easeOutQuad from "../easing/easeOutQuad";
import __clamp from "./clamp";
function easeClamp(num, minEnd, minStart, maxStart, maxEnd) {
  const diffStart = Math.abs(minStart - minEnd), diffEnd = Math.abs(maxStart - maxEnd);
  let computedNum = num;
  if (num <= minStart) {
    const percent = Math.abs(100 / diffStart * __clamp(num, minEnd, minStart));
    computedNum = diffStart / 100 * (__easeOutQuad(1 / 100 * percent) * 100) * -1;
  } else if (num >= maxStart) {
    const percent = Math.abs(100 / diffEnd * __clamp(diffEnd - (maxEnd - num), 0, diffEnd));
    computedNum = maxStart + diffEnd / 100 * (__easeOutQuad(1 / 100 * percent) * 100);
  }
  return computedNum;
}
export {
  easeClamp as default
};
