import "../../../../../chunk-TD77TI6B.mjs";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
function configValue(value) {
  if (typeof value !== "string")
    return value;
  return value.replace(`${__packageRoot()}/`, "");
}
export {
  configValue as default
};
