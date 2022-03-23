import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiLoaderSpinnerMixinInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        default: "s-loader-spinner"
      },
      duration: {
        type: "String",
        default: __STheme.config("ui.loaderSpinner.duration")
      },
      easing: {
        type: "String",
        default: __STheme.config("ui.loaderSpinner.easing")
      }
    };
  }
}
function spinner_default({
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
    display: inline-block;
    pointer-events: none;
    text-indent: -9999em;
    border-top: 0.3em solid sugar.color(current, --alpha 0.8);
    border-right: 0.3em solid sugar.color(current, --alpha 0.8);
    border-bottom: 0.3em solid sugar.color(current, --alpha 0.8);
    border-left: 0.3em solid rgba(0,0,0,0);
    border-radius: 50%;
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
    animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    
    @keyframes ${finalParams.name} {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
  `);
  return vars;
}
export {
  spinner_default as default,
  postcssSugarPluginUiLoaderSpinnerMixinInterface as interface
};
