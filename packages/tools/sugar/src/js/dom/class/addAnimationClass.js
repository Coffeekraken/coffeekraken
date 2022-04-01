import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
