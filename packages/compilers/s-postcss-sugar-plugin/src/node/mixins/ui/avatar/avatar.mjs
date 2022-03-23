import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginUiAvatarInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        value: ["solid"],
        default: "solid"
      },
      shape: {
        type: "String",
        values: ["default", "square", "rounded"],
        default: "default"
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "interactive"],
        default: ["bare", "lnf", "shape"]
      }
    };
  }
}
function avatar_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    shape: "square",
    style: "solid",
    scope: ["bare", "lnf", "shape"]
  }, params);
  const vars = [];
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
            position: relative;
            display: inline-block;
            overflow: hidden;
            width: sugar.scalable(1em);
            height: sugar.scalable(1em);
        `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    switch (finalParams.style) {
      case "solid":
        vars.push(`
                    border-width: sugar.theme(ui.avatar.borderWidth);
                    border-color: sugar.color(current);
                    border-style: solid;
                    @sugar.depth(sugar.theme.value(ui.avatar.depth));
                `);
        break;
    }
  }
  if (finalParams.scope.indexOf("interactive") !== -1) {
    vars.push(`
            cursor: pointer;
        `);
    switch (finalParams.style) {
      case "solid":
        vars.push(`
                    &:hover {
                        @sugar.outline($where: element);
                    }
                `);
        break;
    }
  }
  if (finalParams.scope.indexOf("shape") !== -1) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
                    border-radius: 0;
                `);
        break;
      case "rounded":
        vars.push(`
                    border-radius: sugar.theme(ui.avatar.borderRadius);
                    `);
        break;
      case "default":
      default:
        vars.push(`
                    border-radius: 0.5em;
                `);
        break;
    }
  }
  return vars;
}
export {
  avatar_default as default,
  postcssSugarPluginUiAvatarInterface as interface
};
