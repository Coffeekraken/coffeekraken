// @ts-nocheck
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
        define(["require", "exports", "../config/sugar", "fs-extra"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sugar_1 = __importDefault(require("../config/sugar"));
    var fs_extra_1 = __importDefault(require("fs-extra"));
    function default_1(settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({}, settings);
        var cacheDir = sugar_1.default('storage.cacheDir');
        if (cacheDir !== undefined) {
            fs_extra_1.default.ensureDirSync(cacheDir);
            return cacheDir;
        }
        return undefined;
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9wYXRoL2NhY2hlRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMERBQTRDO0lBQzVDLHNEQUE0QjtJQThCNUIsbUJBQXlCLFFBQWdDO1FBQWhDLHlCQUFBLEVBQUEsYUFBZ0M7UUFDdkQsUUFBUSxnQkFDSCxRQUFRLENBQ1osQ0FBQztRQUNGLElBQU0sUUFBUSxHQUFHLGVBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMxQixrQkFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QixPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFWRCw0QkFVQyJ9