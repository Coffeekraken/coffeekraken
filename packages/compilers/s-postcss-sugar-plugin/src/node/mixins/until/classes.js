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
class postcssSugarPluginUntilClassesInterface extends __SInterface {
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
  const queries = __STheme.config("media.queries");
  const states = __STheme.config("helpers.states");
  const vars = new CssVars();
  states.forEach((state) => {
    vars.comment(() => `/**
            * @name          s-until:${state}
            * @namespace          sugar.css.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until it has reached the state "${state}".
            * 
            * @example        html
            * <s-range class="s-until:${state}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-until.s-until--${state}:not(.s-until--sibling):not(.s-until--siblings):not(.s-until--parent):not(.s-until--grandparent):not(.s-until--ancestor)[${state}] {
                display: none;
            }`);
    vars.comment(() => `/**
            * @name          s-until:sibling:${state}
            * @namespace          sugar.css.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until his previous sibling has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:sibling:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *.${state} + .s-until.s-until--sibling.s-until--${state},
            *[${state}] + .s-until.s-until--sibling.s-until--${state} {
                display: none;
            }`);
    vars.comment(() => `/**
            * @name          s-until:siblings:${state}
            * @namespace          sugar.css.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until one of his previous siblings has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:siblings:${state}">
            *       Display something until one of the previous siblings has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *.${state} ~\xA0 .s-until.s-until--siblings.s-until--${state},
            *[${state}] ~ .s-until.s-until--siblings.s-until--${state} {
                display: none;
            }`);
    vars.comment(() => `/**
            * @name          s-until:parent:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct parent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:parent:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > .s-until.s-until--parent.s-until--${state} {
                display: unset;
            }
            *[${state}] > .s-until.s-until--parent.s-until--${state},
            *.${state} > .s-until.s-until--parent.s-until--${state} {
                display: none;
            }`);
    vars.comment(() => `/**
            * @name          s-until:grandparent:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct grandparent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:grandparent:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) > * > .s-until.s-until--grandparent.s-until--${state} {
                display: unset;
            }
            *[${state}] > * > .s-until.s-until--grandparent.s-until--${state},
            *.${state} > * > .s-until.s-until--grandparent.s-until--${state} {
                display: none;
            }`);
    vars.comment(() => `/**
            * @name          s-until:ancestor:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct ancestor has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:ancestor:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            *:not([${state}]):not(.${state}) .s-until.s-until--ancestor.s-until--${state} {
                display: unset;
            }
            *[${state}] .s-until.s-until--ancestor.s-until--${state},
            *.${state} .s-until.s-until--ancestor.s-until--${state} {
                display: none;
            }`);
  });
  Object.keys(queries).forEach((query) => {
    vars.comment(() => `/**
            * @name          s-until:media:${query}
            * @namespace          sugar.css.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to show any HTMLElement for the passed query.
            * 
            * @example        html
            * <s-range class="s-until:media:${query}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            @sugar.media(${query}) {
                .s-until--media.s-until--${query} {
                    display: none !important;
                }
            }`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginUntilClassesInterface as interface
};
