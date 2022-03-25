var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __fs from "fs";
import __SClass from "@coffeekraken/s-class";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __upperFirst from "@coffeekraken/sugar/shared/string/upperFirst";
class SInterfaceRenderer extends __SClass {
  constructor(int, settings) {
    super(__deepMerge({}, settings));
    this._interface = int;
  }
  async render(settings) {
    const set = __deepMerge(this._settings, {}, settings);
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
          if (set.templatesDir && __fs.existsSync(`${set.templatesDir}/${propKey}.js`)) {
            const { default: templateFunction2 } = await Promise.resolve().then(() => __toESM(require(`${set.templatesDir}/${propKey}.js`)));
            renderedProperties[key][propKey] = templateFunction2(toRenderObj);
          } else if (this[`render${__upperFirst(propKey)}`] && typeof this[`render${__upperFirst(propKey)}`] === "function") {
            renderedProperties[key][propKey] = this[`render${__upperFirst(propKey)}`](toRenderObj);
          }
        }
      }
    }
    let templateFunction = null;
    if (set.templatesDir && __fs.existsSync(`${set.templatesDir}/template.js`)) {
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
export {
  SInterfaceRenderer_default as default
};
