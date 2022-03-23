import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
function isScrollable($elm, settings) {
  settings = __spreadValues({
    x: true,
    y: true
  }, settings != null ? settings : {});
  var overflowY = window.getComputedStyle($elm)["overflow-y"];
  var overflowX = window.getComputedStyle($elm)["overflow-x"];
  const dir = {
    vertical: (overflowY === "scroll" || overflowY === "auto") && $elm.scrollHeight > $elm.clientHeight,
    horizontal: (overflowX === "scroll" || overflowX === "auto") && $elm.scrollWidth > $elm.clientWidth
  };
  if (settings.x && dir.horizontal)
    return true;
  if (settings.y && dir.vertical)
    return true;
  return false;
}
export {
  isScrollable as default
};
