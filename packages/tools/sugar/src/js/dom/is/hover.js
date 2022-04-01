import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function hover($elm) {
  return $elm.parentElement.querySelector(":hover") === $elm;
}
var hover_default = hover;
export {
  hover_default as default
};
