import "../../../../../../chunk-PG3ZPS4G.mjs";
import __camelize from "../../shared/string/camelize";
import __autoCast from "../../shared/string/autoCast";
function styleString2Object(style) {
  if (!style || style === "")
    return {};
  const obj = {};
  const split = style.replace(/\s/g, "").split(";");
  split.forEach((statement) => {
    const spl = statement.split(":"), key = __camelize(spl[0]), value = spl[1];
    obj[key] = __autoCast(value);
  });
  return obj;
}
var styleString2Object_default = styleString2Object;
export {
  styleString2Object_default as default
};
