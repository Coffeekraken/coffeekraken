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
import __SClass from "@coffeekraken/s-class";
import __SDescriptor from "@coffeekraken/s-descriptor";
import __parseArgs from "@coffeekraken/sugar/shared/cli/parseArgs";
import __isNode from "@coffeekraken/sugar/shared/is/node";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __getAvailableInterfaceTypes from "./getAvailableInterfaceTypes";
if (__isNode())
  global._registeredInterfacesTypes = {};
else
  window._registeredInterfacesTypes = {};
const _SInterface = class extends __SClass {
  constructor(settings) {
    super(__deepMerge({
      interface: {
        stripUnkown: false
      }
    }, settings != null ? settings : {}));
    this._definition = {};
    this._definition = this.constructor.definition;
  }
  static get definition() {
    if (this._cachedDefinition)
      return this._cachedDefinition;
    this._cachedDefinition = this._definition;
    return this._cachedDefinition;
  }
  static set definition(value) {
    this._cachedDefinition = value;
  }
  get interfaceSettings() {
    return this._settings.interface;
  }
  static registerRenderer(rendererClass) {
    if (!rendererClass.id) {
      throw new Error(`Sorry but the interface renderer "<yellow>${rendererClass.name}</yellow>" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...`);
    }
    this._registeredRenderers[rendererClass.id] = rendererClass;
  }
  static mix(...ints) {
    const newInt = new _SInterface();
    ints.forEach((int) => {
      if (int.definition) {
        newInt.definition = __deepMerge(newInt.definition, int.definition);
      }
    });
    return newInt;
  }
  static override(definition) {
    const _this = this;
    class SInterfaceOverrided extends this {
    }
    SInterfaceOverrided.overridedName = `${_this.name} (overrided)`;
    SInterfaceOverrided.definition = __deepMerge(_this.definition, definition);
    return SInterfaceOverrided;
  }
  static getAvailableTypes() {
    return __getAvailableInterfaceTypes();
  }
  static makeAvailableAsType(name = null) {
    const n = (name || this.name).toLowerCase();
    if (global !== void 0) {
      global._registeredInterfacesTypes[n] = this;
      global._registeredInterfacesTypes[n.replace("interface", "")] = this;
    } else if (window !== void 0) {
      window._registeredInterfacesTypes[n] = this;
      window._registeredInterfacesTypes[n.replace("interface", "")] = this;
    }
  }
  static toObject() {
    var _a;
    return {
      name: this.name,
      description: (_a = this.description) != null ? _a : "",
      definition: Object.assign({}, this.definition)
    };
  }
  static defaults() {
    const defaults = {};
    Object.keys(this.definition).forEach((key) => {
      const propObj = this.definition[key];
      if (propObj.default !== void 0) {
        defaults[key] = propObj.default;
      }
    });
    return defaults;
  }
  static apply(objectOrString, settings) {
    const int = new this({
      interface: settings != null ? settings : {}
    });
    return int.apply(objectOrString);
  }
  static render(renderer = "terminal", settings) {
    const set = __deepMerge({
      renderer: "terminal",
      exclude: ["help"]
    }, settings);
    if (!this._registeredRenderers[renderer]) {
      throw new Error(`Sorry but the requested renderer "<yellow>${renderer}</yellow>" does not exists... Here's the available renderers: <green>${Object.keys(this._registeredRenderers).join(", ")}</green>`);
    }
    const rendererInstance = new this._registeredRenderers[renderer](this, set);
    return rendererInstance.render();
  }
  apply(objectOrString, settings) {
    var _a;
    const set = __deepMerge(this.interfaceSettings, settings != null ? settings : {});
    let objectOnWhichToApplyInterface = objectOrString;
    if (typeof objectOrString === "string") {
      objectOnWhichToApplyInterface = __parseArgs(objectOrString);
      Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
        for (let i = 0; i < Object.keys(this._definition).length; i++) {
          const defArgName = Object.keys(this._definition)[i];
          const obj = this._definition[defArgName];
          if (obj.explicit) {
            if (obj.alias && ` ${objectOrString} `.match(new RegExp(`\\s-${obj.alias}\\s`)))
              return;
            else if (` ${objectOrString} `.match(new RegExp(`\\s--${argName}\\s`)))
              return;
            delete objectOnWhichToApplyInterface[argName];
          }
        }
      });
      Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
        for (let i = 0; i < Object.keys(this._definition).length; i++) {
          const defArgName = Object.keys(this._definition)[i];
          const obj = this._definition[defArgName];
          if (!obj.alias)
            continue;
          if (obj.alias === argName && objectOnWhichToApplyInterface[defArgName] === void 0) {
            objectOnWhichToApplyInterface[defArgName] = objectOnWhichToApplyInterface[argName];
            delete objectOnWhichToApplyInterface[argName];
          }
        }
      });
      Object.keys(objectOnWhichToApplyInterface).forEach((argName, i) => {
        if (argName === `${i}`) {
          const definitionKeys = Object.keys(this._definition);
          if (definitionKeys[i]) {
            objectOnWhichToApplyInterface[definitionKeys[i]] = objectOnWhichToApplyInterface[argName];
          }
          delete objectOnWhichToApplyInterface[argName];
        }
      });
    }
    const descriptor = new __SDescriptor({
      descriptor: __spreadValues({
        type: "Object",
        rules: this._definition
      }, (_a = set.descriptor) != null ? _a : {})
    });
    if (set.baseObj) {
      objectOnWhichToApplyInterface = __deepMerge(set.baseObj, objectOnWhichToApplyInterface);
    }
    const descriptorResult = descriptor.apply(objectOnWhichToApplyInterface);
    if (descriptorResult.hasIssues()) {
      throw new Error(descriptorResult.toString());
    }
    let resultObj = descriptorResult.value;
    if (!set.stripUnkown) {
      resultObj = __deepMerge(objectOnWhichToApplyInterface, resultObj);
    }
    return resultObj;
  }
};
let SInterface = _SInterface;
SInterface.description = "";
SInterface._registeredRenderers = {};
export {
  SInterface as default
};
