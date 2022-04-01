import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
