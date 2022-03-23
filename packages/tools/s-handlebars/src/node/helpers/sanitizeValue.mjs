import "../../../../../chunk-TD77TI6B.mjs";
function sanitizeValue(string) {
  var _a, _b;
  string = (_b = (_a = string == null ? void 0 : string.toString) == null ? void 0 : _a.call(string)) != null ? _b : "";
  return string.replace(/\n/gm, " ");
}
export {
  sanitizeValue as default
};
