import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
import __faker from "faker";
class postcssSugarPluginUiTableClassesInterface extends __SInterface {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square"],
        default: ["default", "square"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: __STheme.config("ui.table.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square"],
        default: __STheme.config("ui.table.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "tf", "vr"],
        default: ["bare", "lnf", "shape", "tf", "vr"]
      }
    };
  }
}
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function dependencies() {
  return {
    files: [`${__dirname()}/table.js`]
  };
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    styles: [],
    shapes: [],
    defaultStyle: "solid",
    defaultShape: "default",
    scope: []
  }, params);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Table
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/table
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice tables with ease.
        * 
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-table${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} table style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-table${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} table shape`;
  }).join("\n")}
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style ${finalParams.defaultStyle === style ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
            *   <table class="s-table${style === finalParams.defaultStyle ? "" : `:${style}`} s-mbe:30">
            *       <tr>
            *           <th>${__faker.name.findName()}</th>
            *           <th>${__faker.name.findName()}</th>
            *           <th>${__faker.name.findName()}</th>
            *       </tr>
            *       <tr>
            *           <td>${__faker.name.findName()}</td>
            *           <td>${__faker.name.findName()}</td>
            *           <td>${__faker.name.findName()}</td>
            *       </tr>
            *       <tr>
            *           <td>${__faker.name.findName()}</td>
            *           <td>${__faker.name.findName()}</td>
            *           <td>${__faker.name.findName()}</td>
            *       </tr>
            *   </table>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape ${finalParams.defaultShape === shape ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
            *   <table class="s-table${shape === finalParams.defaultShape ? "" : `:${shape}`} s-mbe:30">
            *       <tr>
            *           <th>${__faker.name.findName()}</th>
            *           <th>${__faker.name.findName()}</th>
            *           <th>${__faker.name.findName()}</th>
            *       </tr>
            *       <tr>
            *           <td>${__faker.name.findName()}</td>
            *           <td>${__faker.name.findName()}</td>
            *           <td>${__faker.name.findName()}</td>
            *       </tr>
            *       <tr>
            *           <td>${__faker.name.findName()}</td>
            *           <td>${__faker.name.findName()}</td>
            *           <td>${__faker.name.findName()}</td>
            *       </tr>
            *   </table>
            * `;
  }).join("\n")}
        *
        * @example      html        RTL Support
        * <div dir="rtl">
        *   <table class="s-table">
        *       <tr>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *   </table>
        * </div>
        * 
        * @example      html        Scales
        ${["07", "1", "13", "16"].map((scale) => `
        *   <table class="s-table s-scale:${scale}">
        *       <tr>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *   </table>
        `).join("\n")}
        * 
        * @example      html        Colors (non-exhaustive)
        ${["main", "accent", "complementary", "error"].map((color) => `
        *   <table class="s-table s-color:${color}">
        *       <tr>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *           <th>${__faker.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *           <td>${__faker.name.findName()}</td>
        *       </tr>
        *   </table>
        `).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-table
            * @namespace      sugar.css.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" table
            * 
            * @example        html
            * <table class="s-table">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
                .s-table {
                    @sugar.ui.table($scope: bare);
                }`);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      const isDefaultStyle = finalParams.defaultStyle === style;
      const styleCls = isDefaultStyle ? "" : `.s-table--${style}`;
      const cls = `.s-table${styleCls}`;
      vars.comment(() => `/**
            * @name           s-table${isDefaultStyle ? "" : `:${style}`}
            * @namespace      sugar.css.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" table
            * 
            * @example        html
            * <table class="s-table${isDefaultStyle ? "" : `:${style}`}">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
      vars.code(() => `
                ${cls} {
                    @sugar.ui.table($style: ${style}, $scope: lnf);
                }`);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      const isDefaultShape = finalParams.defaultShape === shape;
      const shapeCls = isDefaultShape ? "" : `.s-table--${shape}`;
      const cls = `.s-table${shapeCls}`;
      vars.comment(() => `/**
            * @name           s-table${isDefaultShape ? "" : `:${shape}`}
            * @namespace      sugar.css.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${shape}</yellow>" table
            * 
            * @example        html
            * <table class="s-table${isDefaultShape ? "" : `:${shape}`}">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
      vars.code(() => `
                ${cls} {
                    @sugar.ui.table($shape: ${shape}, $scope: shape);
                }`);
    });
  }
  vars.comment(() => `/**
        * @name           s-format:text
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent a simple table tag in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format:text">
        *   <table>
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        @sugar.format.text {
          table {
              @sugar.ui.table;
          }
        } 
    `);
  vars.comment(() => `/**
        * @name           s-rhythm:vertical
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent some tables in the s-rhythm:vertical scope
        * 
        * @feature      Vertical rhythm
        * 
        * @example        html
        * <div class="s-rhythm:vertical">
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        @sugar.rhythm.vertical {
          table, .s-table {
              ${__STheme.jsObjectToCssProperties(__STheme.config("ui.table.rhythmVertical"))}
          }
        } 
    `);
  return vars;
}
export {
  classes_default as default,
  dependencies,
  postcssSugarPluginUiTableClassesInterface as interface
};
