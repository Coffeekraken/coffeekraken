import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiTableInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid"],
        default: __STheme.config("ui.table.defaultStyle")
      },
      shape: {
        type: "String",
        values: ["default", "square"],
        default: __STheme.config("ui.table.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "vr"],
        default: ["bare", "lnf", "shape", "vr"]
      }
    };
  }
}
function table_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    style: "solid",
    shape: "default",
    scope: ["bare", "lnf", "shape", "vr"]
  }, params);
  const vars = [];
  if (finalParams.scope.includes("bare")) {
    vars.push(`
    width: 100%;
    font-size: sugar.scalable(1rem);
    table-layout: fixed;
    overflow-wrap: break-word;
    border-collapse: collapse;
    
    &, th, td {
    
    }
    th {
        vertical-align: middle;
    }
    td, th {
        padding-inline: sugar.theme(ui.table.paddingInline);
      padding-block: sugar.theme(ui.table.paddingBlock);

        @sugar.direction.rtl {
            text-align: right;
        }

    }

  `);
  }
  if (finalParams.scope.includes("lnf")) {
    switch (finalParams.style) {
      case "solid":
      default:
        vars.push(`
                    @sugar.depth(sugar.theme.value(ui.table.depth));
                    position: relative;
                    box-shadow: 0 0 0 sugar.theme(ui.table.borderWidth) sugar.color(current, border);
                    overflow: hidden;

                    &, th, td {

                    }
                    th {
                        background-color: sugar.color(current, surface);
                        font-weight: bold;
                    }
                    td, th {
                    
                    }

  `);
        break;
    }
  }
  if (finalParams.scope.includes("shape")) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
    border-radius: 0;
        `);
        break;
      default:
        vars.push(`
    border-radius: sugar.theme(ui.table.borderRadius);
        `);
        break;
    }
  }
  return vars;
}
export {
  table_default as default,
  postcssSugarPluginUiTableInterface as interface
};
