import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function wrap($elm, $wrapper) {
  if (typeof $wrapper === "string") {
    $wrapper = document.createElement($wrapper);
  }
  const $parent = $elm.parentNode;
  const $sibling = $elm.nextSibling;
  if ($sibling) {
    $parent.insertBefore($wrapper, $sibling);
  } else {
    $parent.appendChild($wrapper);
  }
  return $wrapper.appendChild($elm);
}
var wrap_default = wrap;
export {
  wrap_default as default
};
