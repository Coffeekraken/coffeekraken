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
        settings = __assign({ scope: 'local' }, settings);
        if (settings.scope === 'local') {
            var rootDir = sugar_1.default('storage.rootDir');
            if (rootDir !== undefined) {
                fs_extra_1.default.ensureDirSync(rootDir);
                return rootDir;
            }
        }
        return '/';
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGUvcGF0aC9yb290RGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMERBQTRDO0lBQzVDLHNEQUE0QjtJQWtDNUIsbUJBQXlCLFFBQStCO1FBQS9CLHlCQUFBLEVBQUEsYUFBK0I7UUFDdEQsUUFBUSxjQUNOLEtBQUssRUFBRSxPQUFPLElBQ1gsUUFBUSxDQUNaLENBQUM7UUFDRixJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO1lBQzlCLElBQU0sT0FBTyxHQUFHLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDekIsa0JBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sT0FBTyxDQUFDO2FBQ2hCO1NBQ0Y7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFiRCw0QkFhQyJ9