define(["exports"], function(exports) {
  "use strict";
  const __viteBrowserExternal_fs = new Proxy({}, {
    get(_, key) {
      throw new Error(`Module "fs" has been externalized for browser compatibility. Cannot access "fs.${key}" in client code.`);
    }
  });
  exports.default = __viteBrowserExternal_fs;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
});
