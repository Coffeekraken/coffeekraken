var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sVitePluginPostcss_exports = {};
__export(sVitePluginPostcss_exports, {
  default: () => sVitePluginPostcss
});
module.exports = __toCommonJS(sVitePluginPostcss_exports);
var import_postcss = __toESM(require("postcss"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
function sVitePluginPostcss() {
  const fileRegex = /\.css(\?.*)?$/;
  const postcssConfig = import_s_sugar_config.default.get("postcss");
  return {
    name: "s-vite-plugin-postcss",
    async transform(src, id) {
      var _a, _b;
      if (fileRegex.test(id)) {
        const plugins = [];
        for (let i = 0; i < postcssConfig.plugins.length; i++) {
          const p = postcssConfig.plugins[i];
          if (typeof p === "string") {
            const { default: plugin } = await Promise.resolve().then(() => __toESM(require(p)));
            const fn = (_a = plugin.default) != null ? _a : plugin;
            const options = (_b = postcssConfig.pluginsOptions[p]) != null ? _b : {};
            plugins.push(fn(__spreadValues({
              target: "vite"
            }, options)));
          } else {
            plugins.push(p);
          }
        }
        const result = await (0, import_postcss.default)(plugins).process(src != null ? src : "", {
          from: id.split("?")[0]
        });
        return {
          code: result.css,
          map: null
        };
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
