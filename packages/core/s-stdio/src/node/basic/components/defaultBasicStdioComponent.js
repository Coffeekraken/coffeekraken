import __parseHtml from "@coffeekraken/sugar/shared/console/parseHtml";
import __toString from "@coffeekraken/sugar/shared/string/toString";
var defaultBasicStdioComponent_default = {
  id: "default",
  render(logObj, settings = {}) {
    const value = logObj.value !== void 0 ? logObj.value : logObj;
    return __parseHtml(__toString(value));
  }
};
export {
  defaultBasicStdioComponent_default as default
};
