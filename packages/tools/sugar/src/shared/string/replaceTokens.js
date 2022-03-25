import __deepMerge from "../../node/object/deepMerge";
function replaceTokens(string, argsObj, settings = {}) {
  settings = __deepMerge({
    regexp: "\\[([a-zA-Z0-9-_]+)\\]",
    stripUndefined: true
  }, settings);
  let tokens;
  const reg = new RegExp(settings.regexp, "g");
  while (tokens = reg.exec(string)) {
    if (argsObj[tokens[1]] === void 0 && !settings.stripUndefined)
      return;
    string = string.replace(tokens[0], argsObj[tokens[1]] || "");
  }
  return string;
}
var replaceTokens_default = replaceTokens;
export {
  replaceTokens_default as default
};
