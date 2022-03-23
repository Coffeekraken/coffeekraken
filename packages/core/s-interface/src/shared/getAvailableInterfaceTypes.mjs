import "../../../../chunk-JETN4ZEY.mjs";
import __isNode from "@coffeekraken/sugar/shared/is/node";
function getAvailableInterfaceTypes() {
  if (__isNode())
    return global._registeredInterfacesTypes || {};
  else if (window !== void 0)
    return window._registeredInterfacesTypes || {};
  else
    return {};
}
var getAvailableInterfaceTypes_default = getAvailableInterfaceTypes;
export {
  getAvailableInterfaceTypes_default as default
};
