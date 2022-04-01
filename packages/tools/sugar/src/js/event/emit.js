import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SPromise from "@coffeekraken/s-promise";
function emit(name, value) {
  if (!window._sugarEventSPromise)
    window._sugarEventSPromise = new __SPromise({
      id: "sugarEventSPromise"
    });
  window._sugarEventSPromise.emit(name, value);
}
var emit_default = emit;
export {
  emit_default as default
};
