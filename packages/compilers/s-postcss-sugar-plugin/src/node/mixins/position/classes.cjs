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
  interface: () => postcssSugarPluginPositionClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class postcssSugarPluginPositionClassesInterface extends import_s_interface.default {
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
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Positions
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/positions
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some positions like \`absolute\`, \`fixed\`, etc... on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass       s-position:absolute       Apply the \`absolute\` position
        * @cssClass       s-position:relative       Apply the \`relative\` position
        * @cssClass       s-position:fixed       Apply the \`fixed\` position
        * @cssClass       s-position:sticky       Apply the \`sticky\` position
        * @cssClass       s-position:top        Apply the \`top\` position to \`0\`
        * @cssClass       s-position:left        Apply the \`left\` position to \`0\`
        * @cssClass       s-position:right        Apply the \`right\` position to \`0\`
        * @cssClass       s-position:bottom        Apply the \`bottom\` position to \`0\`
        * @cssClass       s-position:center        Center the element either horizontally, vertically or both if no other alignement are specified
        * 
        * @example        html    Absolute
        *   <div class="s-position:relative s-ratio:16-9">
        *       <img class="s-position:absolute:top:left s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *       <img class="s-position:absolute:top:center s-radius" src="https://picsum.photos/100/100?v=3232"/>
        *       <img class="s-position:absolute:top:right s-radius" src="https://picsum.photos/100/100?v=3222132"/>
        *       <img class="s-position:absolute:center:left s-radius" src="https://picsum.photos/100/100?v=322232"/>
        *       <img class="s-position:absolute:center s-radius" src="https://picsum.photos/100/100?v=3434"/>
        *       <img class="s-position:absolute:center:right s-radius" src="https://picsum.photos/100/100?v=35456232"/>
        *       <img class="s-position:absolute:bottom:left s-radius" src="https://picsum.photos/100/100?v=6566"/>
        *       <img class="s-position:absolute:bottom:center s-radius" src="https://picsum.photos/100/100?v=8787"/>
        *       <img class="s-position:absolute:bottom:right s-radius" src="https://picsum.photos/100/100?v=2323"/>
        *   </div>
        * 
        * @example        html        Relative
        *   <div class="s-position:relative s-ratio:21-9">
        *       <img class="s-position:relative" src="https://picsum.photos/100/100"/>
        *   </div>
        * 
        * @example        html        Fixed
        *   <div class="s-position:relative s-ratio:21-9">
        *       <img class="s-position:fixed:top:left s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *       <img class="s-position:fixed:top:center s-radius" src="https://picsum.photos/100/100?v=3232"/>
        *       <img class="s-position:fixed:top:right s-radius" src="https://picsum.photos/100/100?v=3222132"/>
        *       <img class="s-position:fixed:center:left s-radius" src="https://picsum.photos/100/100?v=322232"/>
        *       <img class="s-position:fixed:center s-radius" src="https://picsum.photos/100/100?v=3434"/>
        *       <img class="s-position:fixed:center:right s-radius" src="https://picsum.photos/100/100?v=35456232"/>
        *       <img class="s-position:fixed:bottom:left s-radius" src="https://picsum.photos/100/100?v=6566"/>
        *       <img class="s-position:fixed:bottom:center s-radius" src="https://picsum.photos/100/100?v=8787"/>
        *       <img class="s-position:fixed:bottom:right s-radius" src="https://picsum.photos/100/100?v=2323"/>
        *   </div>
        * 
        * @example    html    Sticky
        *   <div class="s-position:relative s-ratio:21-9">
        *       <div class="s-position:sticky:top">
        *         <img class="s-mbs:100 s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *     </div>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
        
      /**
       * @name            s-position:absolute
       * @namespace       sugar.css.position
       * @type            CssClass
       * @platform      css
       * @status        stable
       * 
       * This class allows you to apply the value "<yellow>absolute</yellow>" to the position property on any HTMLElement
       * 
       * @example     html
       * <div class="s-position:absolute">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
    `).code(`
      .s-position--absolute{
          position: absolute !important;
      }
      `);
  vars.comment(() => `

          /**
           * @name            s-position:relative
           * @namespace       sugar.css.position
           * @type            CssClass
           * @platform        css
           * @status          stable
           * 
           * This class allows you to apply the value "<yellow>relative</yellow>" to the position property on any HTMLElement
           * 
           * @example     html
           * <div class="s-position:relative">
           *  Hello world
           * </div>
           * 
           * @since       2.0.0
           * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
        `).code(`
      .s-position--relative{
          position: relative !important;
      }
      `);
  vars.comment(() => `
          /**
           * @name            s-position:fixed
           * @namespace       sugar.css.position
           * @type            CssClass
           * @platform        css
           * @status          stable
           * 
           * This class allows you to apply the value "<yellow>fixed</yellow>" to the position property on any HTMLElement
           * 
           * @example     html
           * <div class="s-position:fixed">
           *  Hello world
           * </div>
           * 
           * @since       2.0.0
           * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
        `).code(`
      .s-position--fixed{
          position: fixed !important;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-position::sticky
         * @namespace       sugar.css.mixins.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the value "<yellow>sticky</yellow>" to the position property on any HTMLElement
         * 
         * @example     html
         * <div class="s-position:sticky">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--sticky{
          position: sticky !important;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-position:top
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the top property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:top">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--top {
        top: 0;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-position:left
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the left property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:left">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--left {
        left: 0;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-position:bottom
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the bottom property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:bottom">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--bottom {
        bottom: 0;
      }
      `);
  vars.comment(() => `
      /**
         * @name            s-position:right
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the right property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:right">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--right {
        right: 0;
      }
      `);
  vars.comment(() => `
      /**
         * @name            s-position:center
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the right property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:right">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--center:not(.s-position--top):not(.s-position--bottom):not(.s-position--left):not(.s-position--right) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .s-position--center.s-position--left,
      .s-position--center.s-position--right {
        top: 50%;
        transform: translateY(-50%);
      }
      .s-position--center.s-position--top,
      .s-position--center.s-position--bottom {
        left: 50%;
        transform: translateX(-50%);
      }
      `);
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
