import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
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
