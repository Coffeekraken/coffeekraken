import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __traverseUp from "../traverse/up";
import __isScrollable from "../is/scrollable";
function closestScrollable($elm, selector) {
  return __traverseUp($elm, ($e) => __isScrollable($e));
}
export {
  closestScrollable as default
};
