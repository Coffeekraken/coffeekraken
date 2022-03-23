import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginAlignInterface extends __SInterface {
  static get _definition() {
    return {
      align: {
        type: "String",
        required: true
      }
    };
  }
}
function abs_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = new CssVars();
  vars.code(`
        position: absolute;
    `);
  let transform = "";
  const alignSplits = finalParams.align.split(" ").map((l) => l.trim());
  if (alignSplits.indexOf("top") !== -1) {
    vars.code("top: 0;");
  } else if (alignSplits.indexOf("bottom") !== -1) {
    vars.code("bottom: 0;");
  } else if (alignSplits.indexOf("center") !== -1 || alignSplits.indexOf("center-y") !== -1) {
    vars.code("top: 50%;");
    transform += "translateY(-50%) ";
  }
  if (alignSplits.indexOf("left") !== -1) {
    vars.code("left: 0;");
  } else if (alignSplits.indexOf("right") !== -1) {
    vars.code("right: 0;");
  } else if (alignSplits.indexOf("center") !== -1 || alignSplits.indexOf("center-x") !== -1) {
    vars.code("left: 50%;");
    transform += "translateX(-50%)";
  }
  if (transform) {
    vars.code(`transform: ${transform.trim()};`);
  }
  return vars;
}
export {
  abs_default as default,
  postcssSugarPluginAlignInterface as interface
};
