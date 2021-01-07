// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "minimatch", "./flatten", "./deepize"], factory);
    }
})(function (require, exports) {
    "use strict";
    var minimatch_1 = __importDefault(require("minimatch"));
    var flatten_1 = __importDefault(require("./flatten"));
    var deepize_1 = __importDefault(require("./deepize"));
    return function getGlob(obj, glob, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ deepize: true }, settings);
        var flat = flatten_1.default(obj);
        var resultObj = {};
        Object.keys(flat).forEach(function (path) {
            if (minimatch_1.default(path, glob)) {
                resultObj[path] = flat[path];
            }
        });
        if (settings.deepize === true)
            return deepize_1.default(resultObj);
        return resultObj;
    };
});
// console.log(
//   getGlob(
//     {
//       someting: {
//         cool: 'hello'
//       },
//       coco: ['hello', 'world'],
//       world: {
//         'coco.plop': {
//           yep: 'dsojiofj'
//         }
//       }
//     },
//     'world.*'
//   )
// );
//# sourceMappingURL=getGlob.js.map