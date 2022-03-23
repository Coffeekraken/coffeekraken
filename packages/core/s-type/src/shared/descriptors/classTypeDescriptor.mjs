import "../../../../../chunk-JETN4ZEY.mjs";
import __isClass from "@coffeekraken/sugar/shared/is/class";
const descriptor = {
  name: "Class",
  id: "class",
  is: (value) => __isClass(value),
  cast: (value) => {
    return new Error(`Sorry but nothing is castable to a Class`);
  }
};
var classTypeDescriptor_default = descriptor;
export {
  classTypeDescriptor_default as default
};
