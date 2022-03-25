import toString from "../string/toString";
import parse from "../string/parse";
import __btoa from "btoa";
import __atob from "atob";
var base64_default = {
  encrypt: function(message) {
    if (typeof message !== "string")
      message = toString(message);
    return __btoa(message);
  },
  decrypt: function(message) {
    message = __atob(message);
    return parse(message);
  }
};
export {
  base64_default as default
};
