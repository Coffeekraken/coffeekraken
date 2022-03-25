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
import __faker from "faker";
class postcssSugarPluginUiSwitchClassesMixinInterface extends __SInterface {
  static get _definition() {
    var _a;
    return {
      styles: {
        type: "String[]",
        values: ["solid"],
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "pill"],
        default: ["default", "square", "pill"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: (_a = __STheme.config("ui.switch.defaultStyle")) != null ? _a : "solid"
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.switch.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "tf"],
        default: ["bare", "lnf", "shape", "tf"]
      }
    };
  }
}
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function dependencies() {
  return {
    files: [`${__dirname()}/switch.js`]
  };
}
function classes_default({
  params,
  atRule,
  applyNoScopes,
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
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Switch
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/form/switch
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style checkbox HTMLElement as switches
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
    return ` * @cssClass     s-switch${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} switch style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-switch${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} switch shape`;
  }).join("\n")}
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" class="s-switch${style === finalParams.defaultStyle ? "" : `:${style}`}" />
            *   </label>
                <label class="s-mbe:30 s-label">
            *     I'm disabled
            *     <input type="checkbox" disabled class="s-switch${style === finalParams.defaultStyle ? "" : `:${style}`}" />
            *   </label>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" class="s-switch${shape === finalParams.defaultShape ? "" : `:${shape}`}" />
            *   </label>
                <label class="s-mbe:30 s-label">
            *     I'm disabled
            *     <input type="checkbox" disabled class="s-switch${shape === finalParams.defaultShape ? "" : `:${shape}`}" />
            *   </label>
            * `;
  }).join("\n")}
        *
        * @example      html            RTL Support
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        * </div>
        * 
        * @example      html            Colors (non-exhauustive)
        ${["main", "accent", "complementary", "error"].map((color) => `
        *   <label class="s-mbe:30 s-label s-color:${color}">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        `).join("\n")}
        * 
        * @example      html            Scales
        *   <label class="s-mbe:30 s-label s-scale:05">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:10">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:15">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:20">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-switch
            * @namespace      sugar.css.ui.switch
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" switch
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <label class="s-label">
            *   <input type="checkbox" class="s-switch" />
            *   ${__faker.name.findName()}
            * </label>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-switch {
            @sugar.ui.switch($scope: bare);
        }
        `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      let cls = `s-switch`;
      if (style !== finalParams.defaultStyle) {
        cls += `
${style}`;
      }
      vars.comment(() => `/**
                * @name           ${cls}
                * @namespace      sugar.css.ui.switch
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${style}</s-color>" switch
                * 
                * @feature      Vertical rhythm
                * 
                * @example        html
                * <label class="s-label">
                *   <input type="checkbox" class="${cls.replace(/\./gm, " ").trim()}" />
                *   ${__faker.name.findName()}
                * </label>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .${cls.replace("\n", "--")} {
                @sugar.ui.switch($style: ${style}, $scope: lnf);
            }
        `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      let cls = `s-switch`;
      if (shape !== finalParams.defaultShape) {
        cls += `
${shape}`;
      }
      vars.comment(() => `/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.switch
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${shape}</s-color>" switch
        * 
        * @example        html
        * <label class="s-label">
        *   <input type="checkbox" class="${cls.replace(/\./gm, " ").trim()}" />
        *   ${__faker.name.findName()}
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
      .${cls.replace("\n", "--")} {
        @sugar.ui.switch($shape: ${shape}, $scope: shape);
      }
    `);
    });
  }
  return vars;
}
export {
  classes_default as default,
  dependencies,
  postcssSugarPluginUiSwitchClassesMixinInterface as interface
};
