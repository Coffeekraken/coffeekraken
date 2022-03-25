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
  interface: () => postcssSugarPluginActiveClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginActiveClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const queries = import_s_theme.default.config("media.queries");
  const states = import_s_theme.default.config("helpers.states");
  const vars = new CssVars();
  states.forEach((state) => {
    vars.comment(() => `/**
            * @name          s-when:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when it has reached the state "${state}".
            * 
            * @example        html
            * <s-range class="s-when:${state}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-when.s-when--${state}:not(.s-when--sibling):not(.s-when--siblings):not(.s-when--ancestor):not(.s-when--parent):not(.s-when--grandparent):not([${state}]):not(.${state}) {
                display: none;
            }
            .s-when.s-when--${state}:not(.s-when--sibling):not(.s-when--siblings):not(.s-when--ancestor):not(.s-when--parent):not(.s-when--grandparent)[${state}],
            .s-when.s-when--${state}:not(.s-when--sibling):not(.s-when--siblings):not(.s-when--ancestor):not(.s-when--parent):not(.s-when--grandparent).${state} {
                display: unset;
            }`);
    vars.comment(() => `/**
            * @name          s-when:sibling:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when his previous sibling has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:sibling:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) + .s-when.s-when--sibling.s-when--${state} {
                display: none;
            }
            *[${state}] + .s-when.s-when--sibling.s-when--${state},
            *.${state} + .s-when.s-when--sibling.s-when--${state} {
                display: unset !important;
            }`);
    vars.comment(() => `/**
            * @name          s-when:siblings:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when one of his previous siblings has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:siblings:${state}">
            *       Display something when one of the previous siblings has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) ~ .s-when.s-when--siblings.s-when--${state} {
                display: none;
            }
            *[${state}] ~ .s-when.s-when--siblings.s-when--${state},
            *.${state} ~ .s-when.s-when--siblings.s-when--${state} {
                display: unset !important;
            }`);
    vars.comment(() => `/**
            * @name          s-when:parent:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when his direct parent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:parent:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > .s-when.s-when--parent.s-when--${state} {
                display: none;
            }
            *[${state}] > .s-when.s-when--parent.s-when--${state},
            *.${state} > .s-when.s-when--parent.s-when--${state} {
                display: unset;
            }`);
    vars.comment(() => `/**
            * @name          s-when:grandparent:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when his direct grandparent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:grandparent:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > * > .s-when.s-when--grandparent.s-when--${state} {
                display: none;
            }
            *[${state}] > * > .s-when.s-when--grandparent.s-when--${state},
            *.${state} > * > .s-when.s-when--grandparent.s-when--${state} {
                display: unset;
            }`);
    vars.comment(() => `/**
            * @name          s-when:ancestor:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement when his direct ancestor has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-when:ancestor:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) .s-when.s-when--ancestor.s-when--${state} {
                display: none;
            }
            *[${state}] .s-when.s-when--ancestor.s-when--${state},
            *.${state} .s-when.s-when--ancestor.s-when--${state} {
                display: unset;
            }`);
  });
  vars.comment(() => `/**
        * @name          s-when:dark
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when the prefered color scheme is not dark.
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:dark">
        *       Display something when the color scheme is dark
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(`
        .s-when--dark {
            display: none;
        }
        
        [theme$="dark"] .s-when--dark {
            display: inherit;
        }
        `);
  vars.comment(() => `/**
        * @name          s-when:light
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when the prefered color scheme is not light.
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:light">
        *       Display something when the color scheme is light
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(`
        [theme$="dark"] .s-when--light {
            display: none;
        }
        `);
  vars.comment(() => ``).code(`
            .s-when--media {
                display: none;
            }`);
  Object.keys(queries).forEach((query) => {
    vars.comment(() => `/**
            * @name          s-when:media:${query}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to show any HTMLElement for the passed query.
            * 
            * @example        html
            * <s-range class="s-when:media:${query}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            @sugar.media(${query}) {
                .s-when--media.s-when--${query} {
                    display: unset;
                }
            }`);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
