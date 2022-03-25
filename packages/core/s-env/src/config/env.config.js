var _a, _b, _c, _d;
if (global && !global.window)
  global.window = {};
var env_config_default = {
  env: (_d = (_c = (_a = process == null ? void 0 : process.env) == null ? void 0 : _a.NODE_ENV) != null ? _c : (_b = window == null ? void 0 : window.env) == null ? void 0 : _b.ENV) != null ? _d : "dev"
};
export {
  env_config_default as default
};
