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
class postcssSugarPluginUiTerminalClassesInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function dependencies() {
  return {
    files: [`${__dirname()}/terminal.js`]
  };
}
function classes_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [
    `
        /**
         * @name            s-terminal
         * @namespace       sugar.css.ui.terminal
         * @type            CssClass
         * 
         * This class allows you to apply a terminal look to any HTMLElement
         * 
         * @feature       Support vertical rhythm
         * 
         * @example         css
         * <span class="s-terminal">
         *  Something cool
         * </span>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        .s-terminal {
            @sugar.ui.terminal;
        }
  `
  ];
  return vars;
}
export {
  classes_default as default,
  dependencies,
  postcssSugarPluginUiTerminalClassesInterface as interface
};
