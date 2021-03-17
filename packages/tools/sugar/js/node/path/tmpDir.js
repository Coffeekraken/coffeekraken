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
        define(["require", "exports", "temp-dir", "../config/sugar", "fs-extra"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var temp_dir_1 = __importDefault(require("temp-dir"));
    var sugar_1 = __importDefault(require("../config/sugar"));
    var fs_extra_1 = __importDefault(require("fs-extra"));
    var fn = function (settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ scope: 'local' }, settings);
        if (settings.scope === 'local') {
            var tmpDir = sugar_1.default('storage.tmpDir');
            if (tmpDir !== undefined) {
                fs_extra_1.default.ensureDirSync(tmpDir);
                return tmpDir;
            }
        }
        fs_extra_1.default.ensureDirSync(temp_dir_1.default);
        return temp_dir_1.default;
    };
    exports.default = fn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvcGF0aC90bXBEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzREFBZ0M7SUFDaEMsMERBQTRDO0lBQzVDLHNEQUE0QjtJQW9DNUIsSUFBTSxFQUFFLEdBQVksVUFBVSxRQUE4QjtRQUE5Qix5QkFBQSxFQUFBLGFBQThCO1FBQzFELFFBQVEsY0FDTixLQUFLLEVBQUUsT0FBTyxJQUNYLFFBQVEsQ0FDWixDQUFDO1FBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtZQUM5QixJQUFNLE1BQU0sR0FBRyxlQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3hCLGtCQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixPQUFPLE1BQU0sQ0FBQzthQUNmO1NBQ0Y7UUFDRCxrQkFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDN0IsT0FBTyxrQkFBUSxDQUFDO0lBQ2xCLENBQUMsQ0FBQztJQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9