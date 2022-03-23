import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiloaderRoundMixinInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        default: "s-loader-round"
      },
      duration: {
        type: "String",
        default: __STheme.config("ui.loaderRound.duration")
      },
      easing: {
        type: "String",
        default: __STheme.config("ui.loaderRound.easing")
      }
    };
  }
}
function round_default({
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
    pointer-events: none;
    display: inline-block;
    border-radius: 50%;
    background: sugar.color(current);
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
    animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    
    @keyframes ${finalParams.name} {
       0%, 100% {
            animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
        }
        0% {
            transform: rotateY(0deg);
        }
        50% {
            transform: rotateY(900deg);
            animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
        }
        100% {
            transform: rotateY(1800deg);
        }
    }
  `);
  return vars;
}
export {
  round_default as default,
  postcssSugarPluginUiloaderRoundMixinInterface as interface
};
