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
var SType_exports = {};
__export(SType_exports, {
  default: () => SType_default
});
module.exports = __toCommonJS(SType_exports);
var import_map = __toESM(require("@coffeekraken/sugar/shared/iterable/map"));
var import_getExtendsStack = __toESM(require("@coffeekraken/sugar/shared/class/utils/getExtendsStack"));
var import_typeof = __toESM(require("@coffeekraken/sugar/shared/value/typeof"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_parseHtml = __toESM(require("@coffeekraken/sugar/shared/console/parseHtml"));
var import_parseTypeString = __toESM(require("./utils/parseTypeString"));
var import_STypeResult = __toESM(require("./STypeResult"));
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
const _SType = class {
  static registerType(type) {
    if (type.id === void 0 || typeof type.id !== "string") {
      throw new Error(`Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`);
    }
    this._registeredTypes[type.id] = type;
  }
  constructor(typeString, settings = {}) {
    this.typeString = typeString;
    typeString = typeString.toLowerCase().trim();
    if (this.constructor._instanciatedTypes[typeString] !== void 0)
      return this.constructor._instanciatedTypes[typeString];
    this.types = (0, import_parseTypeString.default)(typeString).types;
    this._settings = (0, import_deepMerge.default)({
      id: this.constructor.name,
      name: this.constructor.name,
      customTypes: true,
      interfaces: true
    }, settings);
    this.constructor._instanciatedTypes[typeString] = this;
  }
  is(value, settings = {}) {
    const res = this.check(value, settings);
    if (res === true)
      return true;
    else if (res instanceof import_STypeResult.default)
      return !res.hasIssues();
    return true;
  }
  check(value, settings = {}) {
    settings = (0, import_deepMerge.default)(this._settings, settings);
    const issues = {};
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i], typeId = typeObj.type;
      const res2 = this._isType(value, typeId, settings);
      if (res2 === true) {
        if (typeObj.of === void 0)
          return true;
        const typeOf = (0, import_typeof.default)(value);
        if (typeOf !== "Array" && typeOf !== "Object" && typeOf !== "Map") {
          throw new Error(`Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf}</cyan>" that does not support "child" value(s)...`);
        }
        const loopOn = typeOf === "Object" ? Object.keys(value) : Array.from(value.keys());
        if (!loopOn.length)
          return true;
        for (let k = 0; k < loopOn.length; k++) {
          for (let j = 0; j < typeObj.of.length; j++) {
            const type = typeObj.of[j];
            const idx = loopOn[k];
            const v = typeOf === "Map" ? value.get(idx) : value[idx];
            const ofRes = this._isType(v, type, settings);
            if (ofRes !== true) {
              issues[typeObj.type] = {
                expected: {
                  type: typeObj.type
                },
                received: {
                  type: (0, import_typeof.default)(v),
                  value: v
                }
              };
            } else {
              return true;
            }
          }
        }
      } else {
        const issueObj = {
          expected: {
            type: typeObj.type
          },
          received: {
            type: (0, import_typeof.default)(value),
            value
          }
        };
        if (res2 !== void 0 && res2 !== null && res2 !== false && res2.toString && typeof res2.toString === "function") {
          issueObj.message = res2.toString();
        }
        issues[typeObj.type] = issueObj;
      }
    }
    const res = new import_STypeResult.default({
      typeString: this.typeString,
      value,
      expected: {
        type: this.typeString
      },
      received: {
        type: (0, import_typeof.default)(value)
      },
      issues,
      settings
    });
    return res;
  }
  _isType(value, type, settings = {}) {
    settings = (0, import_deepMerge.default)(this._settings, settings);
    if (this.constructor._registeredTypes[type.toLowerCase()] === void 0) {
      if (settings.interfaces === true) {
        const availableInterfaceTypes = import_s_interface.default.getAvailableTypes();
        if (availableInterfaceTypes[type] !== void 0) {
          const res = availableInterfaceTypes[type].apply(value, {});
          return res;
        }
      }
      if (settings.customTypes === true) {
        const typeOf = (0, import_typeof.default)(value).toLowerCase();
        const extendsStack = Object.keys((0, import_getExtendsStack.default)(value)).map((s) => s.toLowerCase());
        if (type === typeOf || extendsStack.indexOf(type) !== -1)
          return true;
      }
      throw new Error(`Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`);
    }
    return this.constructor._registeredTypes[type.toLowerCase()].is(value);
  }
  cast(value, params, settings) {
    settings = (0, import_deepMerge.default)(this._settings, settings);
    const verboseObj = {
      value,
      issues: {},
      settings,
      toString() {
        const strAr = Object.entries(this.issues);
        return strAr.map((l) => l[1]).join("\n");
      }
    };
    if (this.is(value)) {
      return value;
    }
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i], typeId = typeObj.type;
      const descriptorObj = this.constructor._registeredTypes[typeId.toLowerCase()];
      if (descriptorObj === void 0) {
        continue;
      }
      if (descriptorObj.cast === void 0)
        continue;
      let castedValue;
      castedValue = descriptorObj.cast(value, params);
      if (castedValue instanceof Error) {
        verboseObj.issues[typeId] = castedValue.toString();
        continue;
      }
      if (typeObj.of !== void 0 && this.canHaveChilds(castedValue) === false) {
        const issueStr = `Sorry but the passed type "<yellow>${typeId}</yellow>" has some child(s) dependencies "<green>${typeObj.of.join("|")}</green>" but this type can not have child(s)`;
        throw new Error((0, import_parseHtml.default)(issueStr));
      } else if (typeObj.of !== void 0) {
        const sTypeInstance = new _SType(typeObj.of.join("|"));
        castedValue = (0, import_map.default)(castedValue, ({ value: value2 }) => {
          return sTypeInstance.cast(value2, params, settings);
        });
      }
      if (castedValue === null && descriptorObj.id === "null")
        return null;
      if (castedValue === void 0 && descriptorObj.id === "undefined")
        return void 0;
      if (castedValue !== null && castedValue !== void 0)
        return castedValue;
      verboseObj.issues[typeId] = `Something goes wrong but no details are available... Sorry`;
    }
    const stack = [
      `Sorry but the value of type "<cyan>${(0, import_typeof.default)(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:
`
    ];
    Object.keys(verboseObj.issues).forEach((descriptorId) => {
      stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
    });
    throw new Error((0, import_parseHtml.default)(stack.join("\n")));
  }
  canHaveChilds(value) {
    const type = (0, import_typeof.default)(value);
    return type === "Array" || type === "Object" || type === "Map";
  }
  get name() {
    return this._settings.name;
  }
  get id() {
    return this._settings.id;
  }
};
let SType = _SType;
SType._instanciatedTypes = {};
SType._registeredTypes = {};
const Cls = SType;
var SType_default = SType;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
