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
class postcssSugarPluginUiRadioClassesInterface extends __SInterface {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        values: ["solid"],
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "circle"],
        default: ["default", "square", "circle"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: __STheme.config("ui.radio.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill", "circle"],
        default: __STheme.config("ui.radio.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "vr", "tf"],
        default: ["bare", "lnf", "shape", "vr", "tf"]
      }
    };
  }
}
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function dependencies() {
  return {
    files: [`${__dirname()}/radio.js`]
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
        * @name          Radio
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/radio
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice radio in your forms
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
    return ` * @cssClass     s-radio${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} radio style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-radio${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} radio shape`;
  }).join("\n")}
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="radio" checked class="s-radio" name="radio-style-${style}" value="hello 1" checked />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     I'm disabled
            *     <input type="radio" disabled class="s-radio" name="radio-style-${style}" value="hello 3" />
            *   </label>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="radio" checked class="s-radio${finalParams.defaultShape === shape ? "" : `:${shape}`}" name="radio-shape-${shape}" value="hello 1" checked />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     I'm disabled
            *     <input type="radio" disabled class="s-radio${finalParams.defaultShape === shape ? "" : `:${shape}`}" name="radio-shape-${shape}" value="hello 1" />
            *   </label>
            * `;
  }).join("\n")}
        * 
        * @example        html          Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="radio" checked class="s-radio" name="radio-style-color" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-color" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="radio" class="s-radio s-color:complementary" name="radio-style-color" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     I'm disabled
        *     <input type="radio" disabled class="s-radio s-color:error" name="radio-style-color" value="hello 4" />
        *   </label>
        * 
        * @example        html          RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-ltr" value="hello 1" checked />
        *   </label>
        * </div>
        * 
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-scale" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:13">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:16">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-radio
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem2" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-radio {
                @sugar.ui.radio($scope: bare);
            }
            `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      let cls = `s-radio`;
      if (style !== finalParams.defaultStyle) {
        cls += `--${style}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${style}</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio${style === finalParams.defaultStyle ? "" : `:${style}`}" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio${style === finalParams.defaultStyle ? "" : `:${style}`}" value="something" name="myRadioItem2" />
            <input type="radio" class="s-radio${style === finalParams.defaultStyle ? "" : `:${style}`}" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.radio($style: ${style}, $scope: lnf);
            }
            `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      let cls = `s-radio`;
      if (shape !== finalParams.defaultShape) {
        cls += `--${shape}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${shape}</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio${shape === finalParams.defaultShape ? "" : `:${shape}`}" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio${shape === finalParams.defaultShape ? "" : `:${shape}`}" value="something" name="myRadioItem2" />
            <input type="radio" class="s-radio${shape === finalParams.defaultShape ? "" : `:${shape}`}" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.radio($shape: ${shape}, $scope: shape);
            }
            `);
    });
  }
  if (finalParams.scope.indexOf("tf") !== -1) {
    vars.comment(() => `/**
            * @name           s-format:text input[type="radio"]
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a simple input[type="radio"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="radio" name="my-radio" checked />
            *   <input type="radio" name="my-radio" />
            *   <input type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                input[type="radio"] {
                    @sugar.ui.radio($scope: '${finalParams.scope.join(",")}');
                } 
            }
        `);
  }
  if (finalParams.scope.indexOf("vr") !== -1) {
    vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent some input[type="radio"] in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input class="s-radio" type="radio" name="my-radio" checked />
            *   <input class="s-radio" type="radio" name="my-radio" />
            *   <input class="s-radio" type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                input[type="radio"], .s-radio {
                    ${__STheme.jsObjectToCssProperties(__STheme.config("ui.radio.rhythmVertical"))}
                } 
            }
        `);
  }
  return vars;
}
export {
  classes_default as default,
  dependencies,
  postcssSugarPluginUiRadioClassesInterface as interface
};
