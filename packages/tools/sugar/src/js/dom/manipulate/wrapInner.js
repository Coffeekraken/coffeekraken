import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function wrapInner($parent, $wrapper) {
  if (typeof $wrapper === "string") {
    $wrapper = document.createElement($wrapper);
  }
  $parent.appendChild($wrapper);
  while ($parent.firstChild !== $wrapper) {
    $wrapper.appendChild($parent.firstChild);
  }
  return $parent;
}
var wrapInner_default = wrapInner;
export {
  wrapInner_default as default
};
