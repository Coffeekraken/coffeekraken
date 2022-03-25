var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var typeRule_exports = {};
__export(typeRule_exports, {
  default: () => typeRule_default
});
module.exports = __toCommonJS(typeRule_exports);
var import_s_type = __toESM(require("@coffeekraken/s-type"));
const ruleObj = {
  prority: 10,
  name: "Type",
  id: "type",
  settings: {},
  processParams: (params) => {
    var _a, _b;
    if (!(params == null ? void 0 : params.type) && typeof params !== "string") {
      throw new Error(`<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...`);
    }
    return __spreadProps(__spreadValues({}, typeof params !== "string" ? params : {}), {
      type: (_a = params.type) != null ? _a : params,
      cast: (_b = params.cast) != null ? _b : true
    });
  },
  apply: (value, params, ruleSettings, settings) => {
    const type = new import_s_type.default(params.type, {
      metas: {
        id: settings.id
      }
    });
    if (params.cast && !type.is(value)) {
      value = type.cast(value, params);
    }
    if (!type.is(value)) {
      return new Error(`The value must be of type "<yellow>${params.type}</yellow>" but you've passed a value of type "<cyan>${typeof value}</cyan>"`);
    }
    return value;
  }
};
var typeRule_default = ruleObj;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
