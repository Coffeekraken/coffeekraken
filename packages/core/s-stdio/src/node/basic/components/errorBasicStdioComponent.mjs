import "../../../../../../chunk-TD77TI6B.mjs";
import __parseHtml from "@coffeekraken/sugar/shared/console/parseHtml";
import __toString from "@coffeekraken/sugar/shared/string/toString";
var errorBasicStdioComponent_default = {
  id: "error",
  render(logObj, settings = {}) {
    const value = logObj.value !== void 0 ? logObj.value : logObj;
    return `\u26A0\uFE0F  ${__parseHtml(__toString(value))}`;
  }
};
export {
  errorBasicStdioComponent_default as default
};
