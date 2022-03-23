var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var classes_exports = {};
__export(classes_exports, {
  default: () => classes_default,
  dependencies: () => dependencies,
  interface: () => postcssSugarPluginUiAvatarClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
class postcssSugarPluginUiAvatarClassesInterface extends import_s_interface.default {
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
        default: import_s_theme.default.config("ui.avatar.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: import_s_theme.default.config("ui.avatar.defaultShape")
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
function dependencies() {
  return {
    files: [`${(0, import_dirname.default)()}/avatar.js`]
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dependencies,
  interface
});
