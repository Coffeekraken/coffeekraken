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
class postcssSugarPluginUiBlockquoteClassesInterface extends __SInterface {
  static get _definition() {
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
        default: __STheme.config("ui.blockquote.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.blockquote.defaultShape")
      },
      defaultColor: {
        type: "String",
        values: Object.keys(__STheme.config("color")),
        default: __STheme.config("ui.blockquote.defaultColor")
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
    files: [`${__dirname()}/blockquote.js`]
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
        * @name          Blockquote
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/blockquote
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice blockquote with simple class.
        * 
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Full RTL support
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-blockquote${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} blockquote style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-blockquote${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} blockquote shape`;
  }).join("\n")}
        * @cssClass         s-format:text blockquote            Apply the s-blockquote styling on plain blockquotes
        * @cssClass         s-rhythm:vertical &                 Apply the vertical rhythm on the blockquote
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style
            *   <p class="s-blockquote${style === finalParams.defaultStyle ? "" : `:${style}`}">
            *       ${__faker.lorem.paragraph()}
            *   </p>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape
            *   <p class="s-blockquote${shape === finalParams.defaultShape ? "" : `:${shape}`}">
            *       ${__faker.lorem.paragraph()}
            *   </p>
            * `;
  }).join("\n")}
        *
        * @example        html       Colors (none-exhaustive)
        *   <p class="s-blockquote s-mbe:30 s-color:accent">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-mbe:30 s-color:error">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-mbe:30 s-color:info">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *
        * @example    html       RTL Support
        *   <p class="s-blockquote s-mbe:30" dir="rtl">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html        Scales
        * <p class="s-blockquote s-scale:07 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-scale:10 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * <p class="s-blockquote s-scale:13 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * <p class="s-blockquote s-scale:16 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
        * @name           s-blockquote
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a <span class="s-tc:accent">bare</span> blockquote
        * 
        * @example        html
        * <blockquote class="s-blockquote">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-blockquote {
            @sugar.ui.blockquote($scope: bare);
        } `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      let cls = `s-blockquote`;
      if (style !== finalParams.defaultStyle) {
        cls += `--${style}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.blockquote
            * @type           CssClass
            * 
            * This class represent a <span class="s-tc:accent">${style}</span> blockquote
            * 
            * @example        html
            * <blockquote class="${cls.trim()}">
            *   <p>Hello world</p>
            * </blockquote>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.blockquote($style: ${style}, $scope: lnf);
            } `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      let cls = `s-blockquote`;
      if (shape !== finalParams.defaultShape) {
        cls += `--${shape}`;
      }
      vars.comment(() => `/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a <span class="s-tc:accent">${shape}</span> blockquote
        * 
        * @example        html
        * <blockquote class="${cls.trim()}">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .${cls} {
            @sugar.ui.blockquote($shape: ${shape}, $scope: shape);
        } `);
    });
  }
  if (finalParams.scope.includes("lnf")) {
    vars.code(() => `
            .s-blockquote:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `);
  }
  if (finalParams.scope.indexOf("tf") !== -1) {
    vars.comment(() => `/**
            * @name           s-format:text bloquote
            * @namespace      sugar.css.ui.blockquote
            * @type           CssClass
            * 
            * This class represent a simple blockquote tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <blockquote>
            *       <p>Hello world</p>
            *   </blockquote>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                blockquote {
                    @sugar.ui.blockquote($scope: '${finalParams.scope.join(",")}');
                    @sugar.color(${finalParams.defaultColor});
                } 
            }
        `);
  }
  if (finalParams.scope.indexOf("vr") !== -1) {
    vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.blockquote
            * @type           CssClass
            * 
            * This class represent some blockquotes in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <blockquote class="s-blockquote">
            *       <p>Hello world</p>
            *   </blockquote>
            *   <blockquote class="s-blockquote">
            *       <p>Hello world</p>
            *   </blockquote>
            *   <blockquote class="s-blockquote">
            *       <p>Hello world</p>
            *   </blockquote>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                blockquote, .s-blockquote {
                    ${__STheme.jsObjectToCssProperties(__STheme.config("ui.blockquote.rhythmVertical"))}
                } 
            }
        `);
  }
  return vars;
}
export {
  classes_default as default,
  dependencies,
  postcssSugarPluginUiBlockquoteClassesInterface as interface
};
