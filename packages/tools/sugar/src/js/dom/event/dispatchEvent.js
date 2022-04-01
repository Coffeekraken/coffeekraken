import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SEvent from "../../event/SEvent";
function dispatchEvent($target, name, data = null) {
  const e = new __SEvent(name, {
    detail: data,
    bubbles: true,
    cancelable: true
  });
  $target.dispatchEvent(e);
}
var dispatchEvent_default = dispatchEvent;
export {
  dispatchEvent_default as default
};
