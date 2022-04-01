import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function realHeight(elm) {
  elm.style.transition = "none";
  elm.style.overflowY = "scroll";
  const height = elm.scrollHeight;
  elm.style.overflowY = "";
  elm.style.transition = "";
  return height;
}
var realHeight_default = realHeight;
export {
  realHeight_default as default
};
