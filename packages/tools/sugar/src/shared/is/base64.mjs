import "../../../../../chunk-JETN4ZEY.mjs";
function isBase64(value) {
  if (typeof value !== "string")
    return false;
  if (value === "" || value.trim() === "")
    return false;
  const reg = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return reg.test(value);
}
var base64_default = isBase64;
export {
  base64_default as default
};
