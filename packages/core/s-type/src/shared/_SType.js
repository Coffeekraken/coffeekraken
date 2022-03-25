import __map from "@coffeekraken/sugar/shared/iterable/map";
import __getExtendsStack from "@coffeekraken/sugar/shared/class/utils/getExtendsStack";
import __typeOf from "@coffeekraken/sugar/shared/value/typeof";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __parseHtml from "@coffeekraken/sugar/shared/console/parseHtml";
import __parseTypeString from "./utils/parseTypeString";
import __STypeResult from "./STypeResult";
import __SInterface from "@coffeekraken/s-interface";
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
    this.types = __parseTypeString(typeString).types;
    this._settings = __deepMerge({
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
    else if (res instanceof __STypeResult)
      return !res.hasIssues();
    return true;
  }
  check(value, settings = {}) {
    settings = __deepMerge(this._settings, settings);
    const issues = {};
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i], typeId = typeObj.type;
      const res2 = this._isType(value, typeId, settings);
      if (res2 === true) {
        if (typeObj.of === void 0)
          return true;
        const typeOf = __typeOf(value);
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
                  type: __typeOf(v),
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
            type: __typeOf(value),
            value
          }
        };
        if (res2 !== void 0 && res2 !== null && res2 !== false && res2.toString && typeof res2.toString === "function") {
          issueObj.message = res2.toString();
        }
        issues[typeObj.type] = issueObj;
      }
    }
    const res = new __STypeResult({
      typeString: this.typeString,
      value,
      expected: {
        type: this.typeString
      },
      received: {
        type: __typeOf(value)
      },
      issues,
      settings
    });
    return res;
  }
  _isType(value, type, settings = {}) {
    settings = __deepMerge(this._settings, settings);
    if (this.constructor._registeredTypes[type.toLowerCase()] === void 0) {
      if (settings.interfaces === true) {
        const availableInterfaceTypes = __SInterface.getAvailableTypes();
        if (availableInterfaceTypes[type] !== void 0) {
          const res = availableInterfaceTypes[type].apply(value, {});
          return res;
        }
      }
      if (settings.customTypes === true) {
        const typeOf = __typeOf(value).toLowerCase();
        const extendsStack = Object.keys(__getExtendsStack(value)).map((s) => s.toLowerCase());
        if (type === typeOf || extendsStack.indexOf(type) !== -1)
          return true;
      }
      throw new Error(`Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`);
    }
    return this.constructor._registeredTypes[type.toLowerCase()].is(value);
  }
  cast(value, params, settings) {
    settings = __deepMerge(this._settings, settings);
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
        throw new Error(__parseHtml(issueStr));
      } else if (typeObj.of !== void 0) {
        const sTypeInstance = new _SType(typeObj.of.join("|"));
        castedValue = __map(castedValue, ({ value: value2 }) => {
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
      `Sorry but the value of type "<cyan>${__typeOf(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:
`
    ];
    Object.keys(verboseObj.issues).forEach((descriptorId) => {
      stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
    });
    throw new Error(__parseHtml(stack.join("\n")));
  }
  canHaveChilds(value) {
    const type = __typeOf(value);
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
export {
  SType_default as default
};
