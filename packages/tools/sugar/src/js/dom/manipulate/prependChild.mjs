import "../../../../../../chunk-PG3ZPS4G.mjs";
function prependChild(elm, refElm) {
  if (!refElm.firstChild) {
    refElm.appendChild(elm);
  } else {
    refElm.insertBefore(elm, refElm.firstChild);
  }
  return elm;
}
var prependChild_default = prependChild;
export {
  prependChild_default as default
};
