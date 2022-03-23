import "../../../../../chunk-JETN4ZEY.mjs";
import __isObject from "@coffeekraken/sugar/shared/is/object";
const descriptor = {
  name: "Object",
  id: "object",
  is: (value) => __isObject(value),
  cast: (value) => {
    if (__isObject(value))
      return value;
    return {
      value
    };
  }
};
var objectTypeDescriptor_default = descriptor;
export {
  objectTypeDescriptor_default as default
};
