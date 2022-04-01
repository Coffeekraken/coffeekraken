import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function scrollTop() {
  return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}
var scrollTop_default = scrollTop;
export {
  scrollTop_default as default
};
