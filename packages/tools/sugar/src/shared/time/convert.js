var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var convert_exports = {};
__export(convert_exports, {
  default: () => convert_default
});
module.exports = __toCommonJS(convert_exports);
function convert(from, to = "ms") {
  let fromMs = from;
  if (typeof from === "string") {
    const fromNumber = parseFloat(from);
    const fromLength = fromNumber.toString().length;
    const fromString = from.slice(fromLength);
    if (fromString === "ms" || fromString === "millisecond" || fromString === "milliseconds") {
      fromMs = fromNumber;
    } else if (fromString === "s" || fromString === "second" || fromString === "seconds") {
      fromMs = fromNumber * 1e3;
    } else if (fromString === "m" || fromString === "minute" || fromString === "minutes") {
      fromMs = fromNumber * 60 * 1e3;
    } else if (fromString === "h" || fromString === "hour" || fromString === "hours") {
      fromMs = fromNumber * 60 * 60 * 1e3;
    } else if (fromString === "d" || fromString === "day" || fromString === "days") {
      fromMs = fromNumber * 24 * 60 * 60 * 1e3;
    } else if (fromString === "w" || fromString === "week" || fromString === "weeks") {
      fromMs = fromNumber * 7 * 24 * 60 * 60 * 1e3;
    } else if (fromString === "month" || fromString === "months") {
      fromMs = fromNumber * 31 * 24 * 60 * 60 * 1e3;
    } else if (fromString === "y" || fromString === "year" || fromString === "years") {
      fromMs = fromNumber * 365 * 24 * 60 * 60 * 1e3;
    }
  }
  switch (to) {
    case "ms":
    case "millisecond":
    case "milliseconds":
      return fromMs;
      break;
    case "s":
    case "second":
    case "seconds":
      return fromMs / 1e3;
      break;
    case "m":
    case "minute":
    case "minutes":
      return fromMs / 1e3 / 60;
      break;
    case "h":
    case "hour":
    case "hours":
      return fromMs / 1e3 / 60 / 60;
      break;
    case "d":
    case "day":
    case "days":
      return fromMs / 1e3 / 60 / 60 / 24;
      break;
    case "w":
    case "week":
    case "weeks":
      return fromMs / 1e3 / 60 / 60 / 24 / 7;
      break;
    case "month":
    case "months":
      return fromMs / 1e3 / 60 / 60 / 24 / 31;
      break;
    case "y":
    case "year":
    case "years":
      return fromMs / 1e3 / 60 / 60 / 24 / 365;
      break;
    default:
      throw new Error(`You try to convert "${from}" to "${to}" but this format does not exist... The valids formats are "ms,s,m,h,d,w,month,y"...`);
      break;
  }
}
convert.MILLISECOND = "ms";
convert.SECOND = "s";
convert.MINUTE = "m";
convert.HOUR = "h";
convert.DAY = "d";
convert.WEEK = "w";
convert.MONTH = "month";
convert.YEAR = "y";
var convert_default = convert;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
