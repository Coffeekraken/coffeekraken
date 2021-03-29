var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var require_plop = __commonJS((exports, module) => {
  (function(factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
      var v = factory(require, exports);
      if (v !== void 0)
        module.exports = v;
    } else if (typeof define === "function" && define.amd) {
      define(["require", "exports"], factory);
    }
  })(function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {value: true});
    function coco() {
    }
    exports2.default = coco;
  });
});
export default require_plop();
//# sourceMappingURL=plop.js.map
