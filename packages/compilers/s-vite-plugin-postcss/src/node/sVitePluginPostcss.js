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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __postcss from "postcss";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function sVitePluginPostcss() {
  const fileRegex = /\.css(\?.*)?$/;
  const postcssConfig = __SSugarConfig.get("postcss");
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
        const result = await __postcss(plugins).process(src != null ? src : "", {
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
export {
  sVitePluginPostcss as default
};
