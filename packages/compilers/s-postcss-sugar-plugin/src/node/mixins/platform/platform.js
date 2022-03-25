var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SInterface from "@coffeekraken/s-interface";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __base64 from "@coffeekraken/sugar/shared/crypt/base64";
import __fs from "fs";
class postcssSugarPluginAssetPlatformInterface extends __SInterface {
  static get _definition() {
    return {
      platform: {
        type: "String",
        values: ["js", "node", "ts", "php"],
        required: true
      }
    };
  }
}
function platform_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    platform: ""
  }, params);
  const vars = [];
  if (!__fs.readFileSync(`${__dirname()}/platforms/${finalParams.platform}.svg`)) {
    throw new Error(`<red>[s-postcss-sugar-plugin]</red> Sorry but the requested platform "<yellow>${finalParams.platform}</yellow>" does not exists...`);
  }
  const svgStr = __fs.readFileSync(`${__dirname()}/platforms/${finalParams.platform}.svg`, "utf8");
  vars.push(`
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,${__base64.encrypt(svgStr)}");
  `);
  return vars;
}
export {
  platform_default as default,
  postcssSugarPluginAssetPlatformInterface as interface
};
