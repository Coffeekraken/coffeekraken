import "../../../../../chunk-JETN4ZEY.mjs";
import __parse from "@coffeekraken/sugar/shared/string/parse";
import __upperFirst from "@coffeekraken/sugar/shared/string/upperFirst";
function param(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = {};
  data.forEach((param2) => {
    if (typeof param2 !== "object" || !param2.value || typeof param2.value !== "string")
      return;
    const parts = param2.value.split(/\s{2,20000}/).map((l) => l.trim());
    let type = parts && parts[0] ? __upperFirst(parts[0].replace("{", "").replace("}", "")) : null;
    const variable = parts && parts[1] ? parts[1] : null;
    const description = new String(parts && parts[2] ? parts[2] : null);
    description.render = true;
    let name = variable;
    let defaultValue = void 0;
    let defaultValueStr = "";
    let variableMatch = null;
    if (variable && typeof variable === "string")
      variableMatch = variable.match(/^\[(.*)\]$/);
    if (type && type.includes("|")) {
      type = type.split("|").map((l) => __upperFirst(l.trim()));
    } else {
      type = [type];
    }
    if (variableMatch) {
      const variableParts = variableMatch[1].split("=");
      if (variableParts.length === 2) {
        name = variableParts[0].trim();
        defaultValueStr = variableParts[1].trim();
        defaultValue = __parse(variableParts[1].trim());
      }
    }
    res[name] = {
      name,
      type,
      description,
      default: defaultValue,
      defaultStr: defaultValueStr
    };
    if (param2.content)
      res[name].content = param2.content.join("\n");
  });
  return res;
}
var param_default = param;
export {
  param_default as default
};
