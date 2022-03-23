import "../../../../../chunk-JETN4ZEY.mjs";
import __isString from "@coffeekraken/sugar/shared/is/string";
import __toString from "@coffeekraken/sugar/shared/string/toString";
const descriptor = {
  name: "String",
  id: "string",
  is: (value) => __isString(value),
  cast: (value) => __toString(value, {
    beautify: true
  })
};
var stringTypeDescriptor_default = descriptor;
export {
  stringTypeDescriptor_default as default
};
