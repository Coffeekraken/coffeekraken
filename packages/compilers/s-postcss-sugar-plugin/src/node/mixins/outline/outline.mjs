import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
  static get _definition() {
    return {
      where: {
        type: "String",
        values: ["after", "before", "element"],
        default: "after"
      }
    };
  }
}
function outline_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    where: "after"
  }, params != null ? params : {});
  const vars = [];
  let sel = `&:${finalParams.where}`;
  if (finalParams.where === "element")
    sel = "&";
  vars.push(`

        @keyframes s-outline-in {
            from {
                box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
            }
            to {
                box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
            }
        }

        position: relative;
        
        ${sel} {
            animation: s-outline-in sugar.theme(timing.default) sugar.theme(easing.default) forwards;
            box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
            
            ${finalParams.where !== "element" ? `
                border-radius: sugar.theme(ui.outline.borderRadius);
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
            ` : ""}
        }
    `);
  return vars;
}
export {
  outline_default as default,
  postcssSugarPluginStateOutlineMixinInterface as interface
};
