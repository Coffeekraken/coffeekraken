import "../../../../../chunk-JETN4ZEY.mjs";
function includes(string, values) {
  if (!Array.isArray(values))
    values = values.split(",").map((t) => t.trim());
  const valuesThatExists = [];
  values.forEach((v) => {
    if (string.includes(v)) {
      valuesThatExists.push(v);
    }
  });
  if (valuesThatExists.length)
    return valuesThatExists;
  return false;
}
var includes_default = includes;
export {
  includes_default as default
};
