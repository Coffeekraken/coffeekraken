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
  interface: () => postcssSugarPluginFixClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class postcssSugarPluginFixClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {
      defaultFitSize: {
        type: "String",
        default: "fill"
      }
    };
  }
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    defaultFitSize: "fill"
  }, params);
  const vars = new CssVars();
  const fitSizes = ["fill", "cover", "contain", "none"];
  vars.comment(() => `
      /**
        * @name          Fit Sizes
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/fit-sizes
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a fit size on any HTMLElement.
        * On image and video, uses \`object-fit\` property, on all others,
        * simply fill the element using an absolute position, top: 0, left: 0 and width/height: 100%.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${fitSizes.map((fitSizeName) => {
    return ` * @cssClass     s-fit:${fitSizeName}       Apply the ${fitSizeName} fit size`;
  }).join("\n")}
        * 
        ${fitSizes.map((fitSizeName) => {
    return ` * @example         html        ${fitSizeName}
            *   <div class="s-ratio:16-9 s-bg:ui">
            *       <img class="s-fit:${fitSizeName} s-radius" src="https://picsum.photos/1000/1000" />
            *   </div>
            * `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  fitSizes.forEach((fitSizeName) => {
    vars.comment(() => `/**
                * @name          s-fit:${fitSizeName}
                * @namespace          sugar.css.fit
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${fitSizeName}</yellow>" fit size to any HTMLElement. Work best on images and videos
                * 
                * @example        html
                * <div class="s-ratio:16-9 s-bg:ui">
                *       <img class="s-fit:${fitSizeName} src="https://picsum.photos/200/200" />
                *   </div>
                * 
                * @since        2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-fit--${fitSizeName} {
                    @sugar.fit(${fitSizeName});
                }`);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
