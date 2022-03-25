import __toString from "../string/toString";
import __deepMerge from "../object/deepMerge";
import __isPlainObject from "../is/plainObject";
function argsToString(args, settings = {}) {
  settings = __deepMerge({
    valueQuote: '"',
    keepFalsy: false
  }, settings);
  function processParam(param, value) {
    const finalKey = param.length > 1 ? `--${param}` : `-${param}`;
    if (value === true)
      return `${finalKey}`;
    if (value === false && settings.keepFalsy)
      return `${finalKey} false`;
    if (!value)
      return "";
    let valueStr = value.toString !== void 0 && typeof value.toString === "function" ? value.toString() : __toString(value);
    if (settings.valueQuote === '"')
      valueStr = valueStr.replace(/"/g, '\\"');
    if (settings.valueQuote === "'")
      valueStr = valueStr.replace(/'/g, "\\'");
    if (settings.valueQuote === "`")
      valueStr = valueStr.replace(/`/g, "\\`");
    return `${finalKey} ${settings.valueQuote}${valueStr}${settings.valueQuote}`;
  }
  let string = "";
  Object.keys(args).forEach((key) => {
    const argValue = args[key];
    let str = "";
    if (Array.isArray(argValue)) {
      argValue.forEach((value) => {
        string += ` ${processParam(key, value)}`;
      });
    } else if (__isPlainObject(argValue)) {
      let valueStr = JSON.stringify(argValue);
      string += ` ${processParam(key, valueStr)}`;
    } else {
      string += ` ${processParam(key, argValue)}`;
    }
  });
  return string.replace(/(\s){2,999999}/gm, " ").trim();
}
var argsToString_default = argsToString;
export {
  argsToString_default as default
};
