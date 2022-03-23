import "../../../../../chunk-JETN4ZEY.mjs";
function camelize(text) {
  if (!text)
    text = "";
  let res = "";
  const reg = /(?:^|[_-\s])(\w)/g;
  res = text.replace(reg, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}
var camelize_default = camelize;
export {
  camelize_default as default
};
