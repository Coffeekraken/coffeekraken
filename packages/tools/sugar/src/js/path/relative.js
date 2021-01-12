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
        define(["require", "exports", "../is/glob", "../is/path", "path", "./packageRoot"], factory);
    }
})(function (require, exports) {
    "use strict";
    var glob_1 = __importDefault(require("../is/glob"));
    var path_1 = __importDefault(require("../is/path"));
    var path_2 = __importDefault(require("path"));
    var packageRoot_1 = __importDefault(require("./packageRoot"));
    function relative(path, from, settings) {
        if (from === void 0) { from = packageRoot_1.default(); }
        if (settings === void 0) { settings = {}; }
        settings = __assign({ glob: true, absolute: true }, settings);
        var isArray = Array.isArray(path);
        if (!isArray)
            path = [path];
        path = path.map(function (p) {
            if (glob_1.default(p)) {
                if (settings.glob)
                    return path_2.default.relative(from, p);
                return p;
            }
            else if (path_2.default.isAbsolute(p)) {
                if (settings.absolute)
                    return path_2.default.relative(from, p);
                return p;
            }
            else if (path_1.default(p))
                return path_2.default.relative(from, p);
            return p;
        });
        if (isArray)
            return path;
        return path[0];
    }
    return relative;
});
//# sourceMappingURL=relative.js.map