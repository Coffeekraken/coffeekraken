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
  interface: () => postcssSugarPluginWrapClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_faker = __toESM(require("faker"), 1);
class postcssSugarPluginWrapClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function classes_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [];
  vars.push(`
      /**
        * @name          White space
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/white-space
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some white-space style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-white-space:wrap             Apply the \`white-space\` to \`wrap\`
        * @cssClass         s-white-space:nowrap             Apply the \`white-space\` to \`nowrap\`
        * @cssClass         s-white-space:break-spaces             Apply the \`white-space\` to \`break-spaces\`
        * @cssClass         s-white-space:normal             Apply the \`white-space\` to \`normal\`
        * @cssClass         s-white-space:pre             Apply the \`white-space\` to \`pre\`
        * @cssClass         s-white-space:pre-line             Apply the \`white-space\` to \`pre-line\`
        * @cssClass         s-white-space:pre-wrap             Apply the \`white-space\` to \`pre-wrap\`
        * @cssClass         s-white-space:revert             Apply the \`white-space\` to \`revert\`
        * @cssClass         s-white-space:unset             Apply the \`white-space\` to \`unset\`
        * 
        * @example        html          Wrap
        *   <p class="s-white-space:wrap">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Nowrap
        *   <p class="s-white-space:nowrap">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            Break spaces
        *   <p class="s-white-space:break-spaces">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                Normal
        *   <p class="s-white-space:normal">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre
        *   <p class="s-white-space:pre">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre-line
        *   <p class="s-white-space:pre-line">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre-wrap
        *   <p class="s-white-space:pre-wrap">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            Revert
        *   <p class="s-white-space:revert">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                Unset
        *   <p class="s-white-space:unset">
        *       ${import_faker.default.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  [
    "wrap",
    "nowrap",
    "break-spaces",
    "normal",
    "pre",
    "pre-line",
    "pre-wrap",
    "revert",
    "unset"
  ].forEach((value) => {
    vars.push(`/**
    * @name          s-white-space:${value}
    * @namespace          sugar.css.whiteSpace
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>${value}</yellow>" white-space style to any HTMLElement
    * 
    * @example        html
    * <div class="s-white-space:${value}">${import_faker.default.lorem.paragraph()}</div>
    */
    .s-white-space--${value} {
        white-space: ${value};
    }`);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
