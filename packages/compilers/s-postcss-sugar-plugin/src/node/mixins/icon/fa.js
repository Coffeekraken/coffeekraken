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
var fa_exports = {};
__export(fa_exports, {
  default: () => fa_default,
  interface: () => postcssSugarPluginIconFaInterface
});
module.exports = __toCommonJS(fa_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_parseHtml = __toESM(require("@coffeekraken/sugar/shared/console/parseHtml"));
var import_upperFirst = __toESM(require("@coffeekraken/sugar/shared/string/upperFirst"));
var __fa = __toESM(require("@fortawesome/fontawesome-svg-core"));
var import_free_brands_svg_icons = require("@fortawesome/free-brands-svg-icons");
var import_free_solid_svg_icons = require("@fortawesome/free-solid-svg-icons");
class postcssSugarPluginIconFaInterface extends import_s_interface.default {
  static get _definition() {
    return {
      icon: {
        type: "String",
        required: true
      },
      style: {
        type: "String",
        values: ["solid", "regular", "light", "duotone", "brands"],
        default: "solid"
      }
    };
  }
}
let _isFaInitialised = false;
function fa_default({
  params,
  atRule,
  replaceWith
}) {
  var _a;
  const finalParams = __spreadValues({
    icon: "",
    style: "solid"
  }, params);
  if (finalParams.style === "fa")
    finalParams.style = "fas";
  const prefixes = {
    solid: "fas",
    regular: "far",
    light: "fal",
    duotone: "fad",
    brand: "fab"
  };
  const fontNames = {
    fas: "Free",
    far: "Free",
    fal: "Free",
    fad: "Free",
    fab: "Brands"
  };
  if (!_isFaInitialised) {
    __fa.library.add(import_free_solid_svg_icons.fas, import_free_brands_svg_icons.fab);
    atRule.root().append(`
      @import url('${import_s_sugar_config.default.get("icons.fontawesome.url")}');
    `);
    _isFaInitialised = true;
  }
  const prefix = (_a = prefixes[finalParams.style]) != null ? _a : finalParams.style;
  const iconDef = __fa.findIconDefinition({
    prefix,
    iconName: finalParams.icon
  });
  if (!iconDef) {
    console.log((0, import_parseHtml.default)(`<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`));
    return;
  }
  if (finalParams.style === "solid" || finalParams.style === "fas")
    finalParams.style = "free";
  const vars = [];
  const fontWeight = {
    fas: 900,
    far: 400,
    fal: 300,
    fad: 900,
    fab: 400
  };
  vars.push(`
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    font-family: "Font Awesome 5 ${(0, import_upperFirst.default)(fontNames[prefix])}";
    font-weight: ${fontWeight[prefix]};
    
    &:before {
      content: "\\${iconDef.icon[3]}";
      display: inline-block;
    }
  `);
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
