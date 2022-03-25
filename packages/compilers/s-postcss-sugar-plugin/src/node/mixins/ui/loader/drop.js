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
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiLoaderDropMixinInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        default: "s-loader-drop"
      },
      duration: {
        type: "String",
        default: __STheme.config("ui.loaderDrop.duration")
      },
      easing: {
        type: "String",
        default: __STheme.config("ui.loaderDrop.easing")
      }
    };
  }
}
function drop_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    name: "",
    duration: "",
    easing: ""
  }, params);
  const vars = [];
  vars.push(`
    position: relative;
    display: inline-block;
    pointer-events: none;
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
    
    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%; left: 50%;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        border: sugar.scalable(0.1em) solid sugar.color(current);
        border-radius: 50%;
        width: sugar.scalable(1em); height: sugar.scalable(1em);
    }
    &:before {
        animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    }
    &:after {
        animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} 0.7s infinite;
    }

    @keyframes ${finalParams.name} {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
  `);
  return vars;
}
export {
  drop_default as default,
  postcssSugarPluginUiLoaderDropMixinInterface as interface
};
