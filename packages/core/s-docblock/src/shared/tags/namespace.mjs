import "../../../../../chunk-JETN4ZEY.mjs";
import __namespaceCompliant from "@coffeekraken/sugar/shared/string/namespaceCompliant";
function namespace(data, blockSettings) {
  if (data && data.value && typeof data.value === "string" && data.value.trim() === "") {
    return true;
  }
  let namespace2 = data.value;
  if (!namespace2)
    return data.value;
  if (blockSettings.packageJson) {
    namespace2 = __namespaceCompliant(`${blockSettings.packageJson.name.replace("/", ".")}.${namespace2.replace(/\s{1,9999999}/gm, "-")}`);
  }
  return __namespaceCompliant(namespace2.replace(/\s{1,999999}/gm, "-"));
}
var namespace_default = namespace;
export {
  namespace_default as default
};
