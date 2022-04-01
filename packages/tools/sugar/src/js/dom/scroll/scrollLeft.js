import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function scrollLeft() {
  return window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
}
var scrollLeft_default = scrollLeft;
export {
  scrollLeft_default as default
};
