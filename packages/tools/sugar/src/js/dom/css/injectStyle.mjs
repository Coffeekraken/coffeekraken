import "../../../../../../chunk-PG3ZPS4G.mjs";
import __uniqid from "../../../shared/string/uniqid";
function injectStyle(style, id = `injected-style-${__uniqid()}`, node = document.head) {
  if (document.querySelector(`#${id}`))
    return;
  const $tag = document.createElement("style");
  $tag.type = "text/css";
  $tag.setAttribute("id", `injected-style-${id.toLowerCase()}`);
  $tag.innerHTML = style;
  node.appendChild($tag);
  return $tag;
}
var injectStyle_default = injectStyle;
export {
  injectStyle_default as default
};
