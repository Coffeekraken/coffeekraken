import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __getTransitionProperties from "./style/getTransitionProperties";
function whenTransitionEnd(elm, cb = null) {
  return new Promise((resolve, reject) => {
    const transition = __getTransitionProperties(elm);
    setTimeout(() => {
      resolve();
      cb && cb();
    }, transition.totalDuration);
  });
}
var whenTransitionEnd_default = whenTransitionEnd;
export {
  whenTransitionEnd_default as default
};
