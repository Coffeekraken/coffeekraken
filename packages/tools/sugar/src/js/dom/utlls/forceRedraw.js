import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __getStyleProperty from "../style/getStyleProperty";
function forceRedraw($elm) {
  const display = __getStyleProperty($elm, "display");
  $elm.style.display = "none";
  $elm.offsetHeight;
  $elm.style.display = display;
  return $elm;
}
var forceRedraw_default = forceRedraw;
export {
  forceRedraw_default as default
};
