import __chalk from "chalk";
import __deepMap from "../object/deepMap";
import __isMap from "../is/map";
import __isArray from "../is/array";
import __isBoolean from "../is/boolean";
import __isFunction from "../is/function";
import __isJson from "../is/json";
import __isObject from "../is/object";
import __deepMerge from "../object/deepMerge";
import __mapToObj from "../map/mapToObject";
import { decycle } from "json-cyclic";
function fn(value, settings = {}) {
  settings = __deepMerge({
    beautify: true,
    highlight: true,
    verbose: true,
    theme: {
      number: __chalk.yellow,
      default: __chalk.white,
      keyword: __chalk.blue,
      regexp: __chalk.red,
      string: __chalk.whiteBright,
      class: __chalk.yellow,
      function: __chalk.yellow,
      comment: __chalk.gray,
      variable: __chalk.red,
      attr: __chalk.green
    }
  }, settings);
  if (typeof value === "string")
    return value;
  if (value === null)
    return null;
  if (value === void 0)
    return void 0;
  if (value instanceof Error) {
    const errorStr = value.toString();
    const stackStr = value.stack;
    const messageStr = value.message;
    if (settings.verbose) {
      return [
        `<red>${value.constructor.name || "Error"}</red>`,
        "",
        messageStr,
        "",
        stackStr
      ].join("\n");
    }
    return errorStr;
  }
  if (__isMap(value)) {
    value = __mapToObj(value);
  }
  if (__isObject(value) || __isArray(value) || __isJson(value)) {
    try {
      value = decycle(value);
    } catch (e) {
    }
    value = __deepMap(value, ({ value: value2 }) => {
      if (value2 instanceof Map)
        return __mapToObj(value2);
      return value2;
    });
    let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    prettyString = prettyString.replace(/"([^"]+)":/g, "$1:").replace(/\uFFFF/g, '\\"');
    if (settings.highlight) {
    }
    return prettyString;
  }
  if (__isBoolean(value)) {
    if (value)
      return "true";
    else
      return "false";
  }
  if (__isFunction(value)) {
    return "" + value;
  }
  let returnString = "";
  try {
    value = decycle(value);
    returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } catch (e) {
    try {
      returnString = value.toString();
    } catch (e2) {
      returnString = value;
    }
  }
  return returnString;
}
var toString_default = fn;
export {
  toString_default as default
};
