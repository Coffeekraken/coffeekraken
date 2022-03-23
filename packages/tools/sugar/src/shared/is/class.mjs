import "../../../../../chunk-JETN4ZEY.mjs";
import __isClass from "is-class";
function cls(cls2) {
  if (!Array.isArray(cls2))
    cls2 = [cls2];
  for (let i = 0; i < cls2.length; i++) {
    if (!__isClass(cls2[i]))
      return false;
  }
  return true;
}
var class_default = cls;
export {
  class_default as default
};
