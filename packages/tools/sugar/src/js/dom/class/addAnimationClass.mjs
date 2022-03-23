import "../../../../../../chunk-PG3ZPS4G.mjs";
import __removeClassesOnAnimationEnd from "./removeClassOnAnimationEnd";
function addAnimationClass($elm, cls) {
  if (!Array.isArray(cls))
    cls = [cls];
  cls.forEach((_cls) => {
    $elm.classList.add(_cls);
  });
  return __removeClassesOnAnimationEnd($elm, cls);
}
var addAnimationClass_default = addAnimationClass;
export {
  addAnimationClass_default as default
};
