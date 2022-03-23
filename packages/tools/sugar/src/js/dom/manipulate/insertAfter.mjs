import "../../../../../../chunk-PG3ZPS4G.mjs";
function insertAfter(elm, refElm) {
  const nextSibling = refElm.nextSibling;
  if (!nextSibling) {
    refElm.parentNode.appendChild(elm);
  } else {
    refElm.parentNode.insertBefore(elm, nextSibling);
  }
  return elm;
}
var insertAfter_default = insertAfter;
export {
  insertAfter_default as default
};
