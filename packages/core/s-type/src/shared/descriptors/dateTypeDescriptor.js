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
var dateTypeDescriptor_exports = {};
__export(dateTypeDescriptor_exports, {
  default: () => dateTypeDescriptor_default
});
module.exports = __toCommonJS(dateTypeDescriptor_exports);
var import_plainObject = __toESM(require("@coffeekraken/sugar/shared/is/plainObject"), 1);
const descriptor = {
  name: "Date",
  id: "date",
  is: (value) => value instanceof Date,
  cast: (value) => {
    if (typeof value === "string") {
      return new Date(value);
    }
    if (typeof value === "number") {
      return new Date(Math.round(value));
    }
    if ((0, import_plainObject.default)(value)) {
      const now = new Date();
      let year = now.getFullYear(), month = 0, day = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
      if (value.year && typeof value.year === "number") {
        year = value.year;
      }
      if (value.month && typeof value.month === "number") {
        month = value.month;
      }
      if (value.day && typeof value.day === "number") {
        day = value.day;
      }
      if (value.hours && typeof value.hours === "number") {
        hours = value.hours;
      }
      if (value.minutes && typeof value.minutes === "number") {
        minutes = value.minutes;
      }
      if (value.seconds && typeof value.seconds === "number") {
        seconds = value.seconds;
      }
      if (value.milliseconds && typeof value.milliseconds === "number") {
        milliseconds = value.milliseconds;
      }
      return new Date(year, month, day, hours, minutes, seconds, milliseconds);
    }
    return new Error(`Sorry but for now only <yellow>String</yellow>, <yellow>Number</yellow> and <yellow>Object</yellow> (with properties: year, month, day?, hours?, minutes?, seconds? and milliseconds?) are castable to Date`);
  }
};
var dateTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
