import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function focusWithin($elm) {
  return $elm.parentElement.querySelector(":focus-within") === $elm;
}
var focusWithin_default = focusWithin;
export {
  focusWithin_default as default
};
