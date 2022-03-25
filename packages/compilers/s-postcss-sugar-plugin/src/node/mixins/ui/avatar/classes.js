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
class postcssSugarPluginUiAvatarClassesInterface extends __SInterface {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        values: ["solid"],
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "pill", "circle"],
        default: ["default", "square", "pill", "circle"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: __STheme.config("ui.avatar.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.avatar.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape"],
        default: ["bare", "lnf", "shape"]
      }
    };
  }
}
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function dependencies() {
  return {
    files: [`${__dirname()}/avatar.js`]
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
        * @name          Avatar
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/avatar
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some avatar style around any image.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-avatar${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} avatar style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-avatar${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} avatar shape`;
  }).join("\n")}
        * @cssClass             s-avatar:interactive            Specify that this avatar is interactive
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html         ${style}
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? "" : `:${style}`} s-font:100 s-mie:20" src="https://picsum.photos/300/300?v=23" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? "" : `:${style}`} s-font:100 s-mie:20 s-color:accent" src="https://picsum.photos/300/300?v=24" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? "" : `:${style}`} s-font:100 s-mie:20 s-color:complementary" src="https://picsum.photos/300/300?v=26" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? "" : `:${style}`} s-font:100 s-mie:20 s-color:info" src="https://picsum.photos/300/300?v=21" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? "" : `:${style}`} s-font:100 s-mie:20 s-color:success" src="https://picsum.photos/300/300?v=255" />
                  *   <img class="s-avatar${style === finalParams.defaultStyle ? "" : `:${style}`} s-font:100 s-mie:20 s-color:error" src="https://picsum.photos/300/300?v=2121" />`;
  })}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html         ${shape}
                  *   <img class="s-avatar${shape === finalParams.defaultShape ? "" : `:${shape}`} s-font:100 s-mie:20" src="https://picsum.photos/300/300?v=23" />
                  *   <img class="s-avatar${shape === finalParams.defaultShape ? "" : `:${shape}`} s-font:100 s-mie:20 s-color:accent" src="https://picsum.photos/300/300?v=24" />
                  *   <img class="s-avatar${shape === finalParams.defaultShape ? "" : `:${shape}`} s-font:100 s-mie:20 s-color:complementary" src="https://picsum.photos/300/300?v=26" />
                  *   <img class="s-avatar${shape === finalParams.defaultShape ? "" : `:${shape}`} s-font:100 s-mie:20 s-color:info" src="https://picsum.photos/300/300?v=21" />
                  *   <img class="s-avatar${shape === finalParams.defaultShape ? "" : `:${shape}`} s-font:100 s-mie:20 s-color:success" src="https://picsum.photos/300/300?v=255" />
                  *   <img class="s-avatar${shape === finalParams.defaultShape ? "" : `:${shape}`} s-font:100 s-mie:20 s-color:error" src="https://picsum.photos/300/300?v=2121" />`;
  })}
        * 
        * @example       html         Interactive
        *   <img class="s-avatar:interactive s-font:100 s-mie:20" src="https://picsum.photos/300/300?v=23223434" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-color:accent" src="https://picsum.photos/300/300?v=2333234234" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-color:complementary" src="https://picsum.photos/300/300?v=2113111" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-color:info" src="https://picsum.photos/300/300?v=26663332" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-color:success" src="https://picsum.photos/300/300?v=288333232" />
        *   <img class="s-avatar:interactive s-font:100 s-mie:20 s-color:error" src="https://picsum.photos/300/300?v=23343222" />
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        * @contributor 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @contributor 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @contributor 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @contributor 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
          * @name           s-avatar
          * @namespace      sugar.css.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">bare</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
          .s-avatar {
            @sugar.ui.avatar($scope: bare);
          }
      `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      vars.comment(() => `/**
            * @name           s-avatar${style === finalParams.defaultStyle ? "" : `:${style}`}
            * @namespace      sugar.css.ui.avatar
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color>" avatar
            * 
            * @example        html
            * <span class="s-avatar">
            *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
            * </span>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`).code(`
            .s-avatar${style === finalParams.defaultStyle ? "" : `--${style}`} {
                @sugar.ui.avatar($style: ${style}, $scope: lnf);
            }
        `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      vars.comment(() => `/**
          * @name           s-avatar${shape === finalParams.defaultShape ? "" : `:${shape}`}
          * @namespace      sugar.css.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">default</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
          .s-avatar${shape === finalParams.defaultShape ? "" : `--${shape}`} {
            @sugar.ui.avatar($shape: ${shape}, $scope: shape);
          }
      `);
    });
  }
  vars.comment(() => `/**
          * @name           s-avatar:interactive
          * @namespace      sugar.css.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">interactive</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar:interactive">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
          .s-avatar--interactive {
              @sugar.ui.avatar($scope: 'interactive');
          }
      `);
  return vars;
}
export {
  classes_default as default,
  dependencies,
  postcssSugarPluginUiAvatarClassesInterface as interface
};
