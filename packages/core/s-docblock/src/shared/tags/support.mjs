import "../../../../../chunk-JETN4ZEY.mjs";
function support(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = [];
  data.forEach((support2) => {
    var _a;
    if (!support2.value)
      return;
    const parts = support2.value.split(/\s{2,20000}/).map((l) => l.trim());
    const description = new String((_a = parts[1]) != null ? _a : "");
    description.render = true;
    res.push({
      name: parts[0],
      description
    });
  });
  return res;
}
var support_default = support;
export {
  support_default as default
};
