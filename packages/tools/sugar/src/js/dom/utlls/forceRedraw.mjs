import "../../../../../../chunk-PG3ZPS4G.mjs";
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
