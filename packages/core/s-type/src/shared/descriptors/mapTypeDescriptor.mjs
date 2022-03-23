import "../../../../../chunk-JETN4ZEY.mjs";
import __isMap from "@coffeekraken/sugar/shared/is/map";
const descriptor = {
  name: "Map",
  id: "map",
  is: (value) => __isMap(value),
  cast: (value) => {
    if (__isMap(value))
      return value;
    const map = /* @__PURE__ */ new Map();
    map.set("value", value);
    return map;
  }
};
var mapTypeDescriptor_default = descriptor;
export {
  mapTypeDescriptor_default as default
};
