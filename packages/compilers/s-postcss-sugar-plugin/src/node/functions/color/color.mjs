import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SColor from "@coffeekraken/s-color";
import __SInterface from "@coffeekraken/s-interface";
import __isColor from "@coffeekraken/sugar/shared/is/color";
class colorVariantNameInterface extends __SInterface {
  static get _definition() {
    return {
      saturate: {
        type: "Number|String",
        default: 0
      },
      desaturate: {
        type: "Number",
        default: 0
      },
      darken: {
        type: "Number",
        default: 0
      },
      lighten: {
        type: "Number",
        default: 0
      },
      spin: {
        type: "Number",
        default: 0
      },
      alpha: {
        type: "Number",
        default: 1
      }
    };
  }
}
class postcssSugarPluginColorInterface extends __SInterface {
  static get _definition() {
    return {
      color: {
        type: "String",
        alias: "c"
      },
      variant: {
        type: "String",
        alias: "v"
      },
      modifier: {
        type: "String",
        alias: "m"
      }
    };
  }
}
function color({
  params
}) {
  var _a, _b, _c;
  const finalParams = __spreadValues({
    color: "",
    variant: void 0,
    modifier: void 0
  }, params);
  if (finalParams.color.match(/^(hsla?|rgba?|hsv)\(/))
    return finalParams.color;
  if (finalParams.color.match(/^var\(--/))
    return finalParams.color;
  let colorName = finalParams.color;
  let colorVariantName = (_a = finalParams.variant) != null ? _a : "";
  let colorModifier = (_b = finalParams.modifier) != null ? _b : "";
  let colorStateName = "";
  if (colorVariantName.match(/^--[a-z]+/)) {
    colorModifier = colorVariantName;
    colorVariantName = void 0;
  }
  const nameParts = finalParams.color.split(":");
  if (nameParts.length === 2) {
    colorName = nameParts[0];
    colorStateName = nameParts[1];
  }
  let modifierParams = {};
  if (colorModifier) {
    modifierParams = colorVariantNameInterface.apply(colorModifier);
  }
  if (__isColor(colorName)) {
    const color2 = new __SColor(colorName);
    if (colorModifier) {
      color2.apply(colorModifier);
    }
    return color2.toString();
  } else {
    const colorVar = `--s-theme-color-${colorName}`;
    let colorVariantNameVar = `s-theme-color-${colorName}`;
    if (colorStateName) {
      colorVariantNameVar += `-${colorStateName}`;
    }
    if (colorVariantName) {
      colorVariantNameVar += `-${colorVariantName}`;
    }
    colorVariantNameVar = "--" + colorVariantNameVar.replace(/-{2,999}/gm, "-");
    let finalValue = colorVar;
    const hParts = [
      `var(${colorVar}-h, 0)`,
      `var(${colorVariantNameVar}-spin ,${(_c = modifierParams.spin) != null ? _c : 0})`
    ];
    const sParts = [`var(${colorVar}-s, 0)`];
    if (colorVariantName) {
      sParts.push(`var(${colorVariantNameVar}-saturation-offset, 0)`);
    }
    let saturationOffset = modifierParams.saturate ? modifierParams.saturate : modifierParams.desaturate ? modifierParams.desaturate * -1 : void 0;
    if (saturationOffset !== void 0) {
      sParts.push(saturationOffset);
    }
    const lParts = [`var(${colorVar}-l, 0)`];
    if (colorVariantName) {
      lParts.push(`var(${colorVariantNameVar}-lightness-offset, 0)`);
    }
    let lightnessOffset = modifierParams.lighten ? modifierParams.lighten : modifierParams.darken ? modifierParams.darken * -1 : void 0;
    if (lightnessOffset !== void 0) {
      lParts.push(lightnessOffset);
    }
    let alpha = modifierParams.alpha !== void 0 ? modifierParams.alpha : 1;
    finalValue = `hsla(
            calc(
                ${hParts.join(" + ")}
            ),
            calc(
                (${sParts.join(" + ")}) * 1%
            ),
            calc(
                (${lParts.join(" + ")}) * 1%
            ),
            ${modifierParams.alpha !== void 0 ? modifierParams.alpha : `var(${colorVariantNameVar}-a, 1)`}
    )`;
    finalValue = finalValue.replace(/(\n|\s{2,99999999})/gm, "").replace(/\t/gm, " ").replace(/\s?\+\s?/gm, " + ").replace(/\)\-\s?/gm, ") - ").replace(/\s?\*\s?/gm, " * ").replace(/\s?\/\s?/gm, " / ");
    return finalValue;
  }
}
export {
  color as default,
  postcssSugarPluginColorInterface as interface
};
