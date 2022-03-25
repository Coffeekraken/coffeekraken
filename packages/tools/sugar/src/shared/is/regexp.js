function isRegexp(value) {
  return value && typeof value === "object" && value.constructor === RegExp;
}
var regexp_default = isRegexp;
export {
  regexp_default as default
};
