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
class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
  static get _definition() {
    var _a;
    return {
      styles: {
        type: "String[]",
        values: ["solid", "gradient", "outline", "text"],
        default: ["solid", "gradient", "outline", "text"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "pill"],
        default: ["default", "square", "pill"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid", "gradient", "outline", "text"],
        default: (_a = __STheme.config("ui.button.defaultStyle")) != null ? _a : "solid"
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.button.defaultShape")
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
    files: [`${__dirname()}/button.js`]
  };
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    styles: ["solid", "gradient", "outline", "text"],
    shapes: [],
    defaultStyle: "solid",
    defaultShape: "default",
    scope: ["bare", "lnf", "shape", "tf", "vr"]
  }, params);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Buttons
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/button
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a button
        * 
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-btn${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} button style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-btn${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} button shape`;
  }).join("\n")}
        * @cssClass            s-format:text button             Apply the button style on button tags inside the s-format:text scope 
        * @cssClass            s-btn-group s-btn                Apply the button group style on a buttons wrapper
        * @cssClass            s-rhythm:vertical              Apply the default vertical rhythm on scoped button(s)
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style ${finalParams.defaultStyle === style ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
            *   <a tabindex="0" class="s-btn:${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20 s-mbe:20"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20 s-mbe:20 s-color:accent"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20 s-mbe:20 s-color:complementary"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20 s-mbe:20 s-color:info"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20 s-mbe:20 s-color:error"><span>Click me!</span></a>
            *   <span class="s-btn-group s-mie:20 s-mbe:20">
            *       <a tabindex="0" class="s-btn:${finalParams.defaultStyle === style ? "" : `:${style}`}"><span>Click me!</span></a>
            *       <a tabindex="0" class="s-btn:${finalParams.defaultStyle === style ? "" : `:${style}`}"><span>+</span></a>
            *   </span>
            *   <a tabindex="0" disabled class="s-btn:${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20 s-mbe:20"><span>Click me!</span></a>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape ${finalParams.defaultShape === shape ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
            *   <a tabindex="0" class="s-btn:${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20 s-mbe:20">Click me!</a>
            *   <a tabindex="0" class="s-btn:${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20 s-mbe:20 s-color:accent">Click me!</a>
            *   <a tabindex="0" class="s-btn:${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20 s-mbe:20 s-color:complementary">Click me!</a>
            *   <a tabindex="0" class="s-btn:${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20 s-mbe:20 s-color:info">Click me!</a>
            *   <a tabindex="0" class="s-btn:${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20 s-mbe:20 s-color:error">Click me!</a>
            *   <span class="s-btn-group s-mie:20 s-mbe:20">
            *       <a tabindex="0" class="s-btn:${finalParams.defaultShape === shape ? "" : `:${shape}`}">Click me!</a>
            *       <a tabindex="0" class="s-btn:${finalParams.defaultShape === shape ? "" : `:${shape}`}"><span>+</span></a>
            *   </span>
            *   <a tabindex="0" disabled class="s-btn:${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20 s-mbe:20">Click me!</a>
            * `;
  }).join("\n")}
        * 
        * @example       html       Scales
        *   <a tabindex="0" class="s-btn s-scale:07 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:1 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:13 s-mie:20">Click me!</a>
        *   <a tabindex="0" class="s-btn s-scale:16 s-mie:20">Click me!</a>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-btn
            * @namespace      sugar.css.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" button
            * 
            * @example        html
            * <a class="s-btn">I'm a cool button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-btn {
            @sugar.ui.button($scope: bare);
        }`);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      let cls = `s-btn`;
      if (style !== finalParams.defaultStyle) {
        cls += `--${style}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${style}</s-color>" button
            * 
            * @example        html
            * <a class="${cls.replace(/\./gm, " ").trim()}">I'm a cool button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .${cls} {
            @sugar.ui.button($style: ${style}, $scope: lnf);
        }`);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      let cls = `s-btn`;
      if (shape !== finalParams.defaultShape) {
        cls += `--${shape}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.button
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${shape}</s-color>" button
            * 
            * @example        html
            * <a class="${cls.replace(/\./gm, " ").trim()}">I'm a cool button</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .${cls} {
            @sugar.ui.button($shape: ${shape}, $scope: shape);
        }`);
    });
  }
  vars.comment(() => `/**
        * @name           s-btn--block
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">block</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--block">I'm a cool block button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`).code(`
      .s-btn--block {
        display: block !important;
      }
    `);
  vars.comment(() => `/**
        * @name           s-btn-group
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">group</s-color>" of buttons
        * 
        * @example        html
        * <span class="s-btn-group">
        *   <a class="s-btn--block">I'm a cool block button</a>
        *   <a class="s-btn--block">+</a>
        * </span>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`);
  vars.code(`
      .s-btn-group {
          display: inline-flex !important;   
          flex-wrap: nowrap;
          vertical-align: top;
      }
      .s-btn-group > .s-btn {

        &:first-child:not(:last-child) {
          border-inline-end: 1px solid sugar.color(current, --darken 5);
        }

        &:not(:first-child):not(:last-child),
        &:not(:first-child):not(:last-child):before,
        &:not(:first-child):not(:last-child):after {
            border-radius: 0 !important;
        }
        &:first-child:not(:last-child),
        &:first-child:not(:last-child):before,
        &:first-child:not(:last-child):after {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
        &:last-child:not(:first-child),
        &:last-child:not(:first-child):before,
        &:last-child:not(:first-child):after {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-inline-start: none !important;
        }
      }
    `);
  if (finalParams.scope.indexOf("tf") !== -1) {
    vars.comment(() => `/**
            * @name           s-format:text button
            * @namespace      sugar.css.ui.button
            * @type           CssClass
            * 
            * This class represent a simple button tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <button>
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                button {
                    @sugar.ui.button($scope: '${finalParams.scope.join(",")}');
                } 
            }
        `);
  }
  if (finalParams.scope.indexOf("vr") !== -1) {
    vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.button
            * @type           CssClass
            * 
            * This class represent some buttons in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                button, .s-btn {
                    ${__STheme.jsObjectToCssProperties(__STheme.config("ui.button.rhythmVertical"))}
                } 
            }
        `);
  }
  return vars;
}
export {
  classes_default as default,
  dependencies,
  postcssSugarPluginUiButtonClassesInterface as interface
};
