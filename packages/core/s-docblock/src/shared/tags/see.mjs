import "../../../../../chunk-JETN4ZEY.mjs";
function see(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = [];
  data.forEach((see2) => {
    var _a;
    if (!see2.value)
      return;
    const parts = see2.value.split(/\s{2,20000}/).map((l) => l.trim());
    const url = parts[0], description = new String((_a = parts[1]) != null ? _a : "");
    description.render = true;
    res.push({
      url,
      description
    });
  });
  return res;
}
var see_default = see;
export {
  see_default as default
};
