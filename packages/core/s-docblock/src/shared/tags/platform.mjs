import "../../../../../chunk-JETN4ZEY.mjs";
function param(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = [];
  data.forEach((param2) => {
    var _a;
    if (!param2.value)
      return;
    const parts = param2.value.split(/\s{2,20000}/).map((l) => l.trim());
    res.push({
      name: parts[0],
      description: (_a = parts[1]) != null ? _a : ""
    });
  });
  return res;
}
var platform_default = param;
export {
  platform_default as default
};
