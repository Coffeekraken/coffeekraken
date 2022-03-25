function isTestEnv() {
  var _a;
  return ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.NODE_ENV) === "test";
}
var testEnv_default = isTestEnv;
export {
  testEnv_default as default
};
