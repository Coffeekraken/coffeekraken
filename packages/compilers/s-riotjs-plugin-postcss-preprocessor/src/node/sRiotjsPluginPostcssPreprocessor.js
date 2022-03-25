var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import { registerPreprocessor } from "@riotjs/compiler";
import postcss from "postcss";
function sRiotjsPluginPostcssPreprocessor(postcssPlugins) {
  registerPreprocessor("css", "postcss", async function(code) {
    var _a;
    const plugins = [];
    for (let i = 0; i < postcssPlugins.length; i++) {
      const p = postcssPlugins[i];
      if (typeof p === "string") {
        const { default: plug } = await Promise.resolve().then(() => __toESM(require(p)));
        plugins.push((_a = plug.default) != null ? _a : plug);
      } else {
        plugins.push(p);
      }
    }
    const result = await postcss(plugins).process(code);
    console.log(result);
    return {
      code: result.css,
      map: null
    };
  });
}
export {
  sRiotjsPluginPostcssPreprocessor as default
};
