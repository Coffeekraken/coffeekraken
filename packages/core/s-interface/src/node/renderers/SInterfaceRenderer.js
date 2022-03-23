var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var SInterfaceRenderer_exports = {};
__export(SInterfaceRenderer_exports, {
  default: () => SInterfaceRenderer_default
});
module.exports = __toCommonJS(SInterfaceRenderer_exports);
var import_fs = __toESM(require("fs"), 1);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_upperFirst = __toESM(require("@coffeekraken/sugar/shared/string/upperFirst"), 1);
class SInterfaceRenderer extends import_s_class.default {
  constructor(int, settings) {
    super((0, import_deepMerge.default)({}, settings));
    this._interface = int;
  }
  async render(settings) {
    const set = (0, import_deepMerge.default)(this._settings, {}, settings);
    const renderedProperties = {};
    for (const key in this._interface.definition) {
      const propertyObj = this._interface.definition[key];
      if (!propertyObj.name)
        propertyObj.name = key;
      renderedProperties[key] = {
        name: key
      };
      for (const propKey in propertyObj) {
        if (propertyObj[propKey] !== void 0 && set.exclude.indexOf(propKey) === -1) {
          const toRenderObj = {
            value: propertyObj[propKey],
            property: propertyObj,
            interfaceClass: this._interface
          };
          if (set.templatesDir && import_fs.default.existsSync(`${set.templatesDir}/${propKey}.js`)) {
            const { default: templateFunction2 } = await Promise.resolve().then(() => __toESM(require(`${set.templatesDir}/${propKey}.js`)));
            renderedProperties[key][propKey] = templateFunction2(toRenderObj);
          } else if (this[`render${(0, import_upperFirst.default)(propKey)}`] && typeof this[`render${(0, import_upperFirst.default)(propKey)}`] === "function") {
            renderedProperties[key][propKey] = this[`render${(0, import_upperFirst.default)(propKey)}`](toRenderObj);
          }
        }
      }
    }
    let templateFunction = null;
    if (set.templatesDir && import_fs.default.existsSync(`${set.templatesDir}/template.js`)) {
      templateFunction = (await Promise.resolve().then(() => __toESM(require(`${set.templatesDir}/template.js`)))).default;
    } else if (this["renderTemplate"] && typeof this["renderTemplate"] === "function") {
      (templateFunction = this["renderTemplate"]).bind(this);
    }
    if (!templateFunction) {
      throw new Error(`Sorry but your SInterfaceRenderer named "<yellow>${this.constructor.name}</yellow>" need a template and seems to not have one defined... Either specify a "<cyan>renderTemplate</cyan>" method or create a "<cyan>${set.templatesDir || this.constructor.id}/template.js</cyan>" file...`);
    }
    return templateFunction({
      interfaceClass: this._interface,
      properties: renderedProperties
    });
  }
}
SInterfaceRenderer.id = "default";
var SInterfaceRenderer_default = SInterfaceRenderer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
