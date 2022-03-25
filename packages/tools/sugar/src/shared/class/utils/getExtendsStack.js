import __isClass from "../../is/class";
const fn = function(cls, settings = {}) {
  const stack = {};
  if (!__isClass(cls)) {
    cls = cls.constructor;
  }
  if (settings.includeBaseClass === true) {
    stack[cls.name] = cls;
  }
  let baseClass = cls;
  while (baseClass) {
    const newBaseClass = Object.getPrototypeOf(baseClass);
    if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
      stack[newBaseClass.name] = newBaseClass;
      baseClass = newBaseClass;
    } else {
      break;
    }
  }
  return stack;
};
var getExtendsStack_default = fn;
export {
  getExtendsStack_default as default
};
