/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __exportStar = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
};

// ../../webcomponents/s-highlight-js/src/js/exports.js
var require_exports = __commonJS((exports, module) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar2 = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  (function(factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
      var v = factory(require, exports);
      if (v !== void 0)
        module.exports = v;
    } else if (typeof define === "function" && define.amd) {
      define(["require", "exports", "./SHighlightJs", "./SHighlightJs"], factory);
    }
  })(function(require2, exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {value: true});
    var SHighlightJs_1 = __importDefault(require2("./SHighlightJs"));
    __exportStar2(require2("./SHighlightJs"), exports2);
    exports2.default = SHighlightJs_1.default;
  });
});

// src/js/index.ts
var import_s_highlight_js = __toModule(require_exports());
//# sourceMappingURL=index.js.map
