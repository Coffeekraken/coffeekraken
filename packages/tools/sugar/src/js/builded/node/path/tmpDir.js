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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZS9wYXRoL3RtcERpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNEQUFnQztJQUNoQywwREFBNEM7SUFDNUMsc0RBQTRCO0lBb0M1QixJQUFNLEVBQUUsR0FBWSxVQUFVLFFBQThCO1FBQTlCLHlCQUFBLEVBQUEsYUFBOEI7UUFDMUQsUUFBUSxjQUNOLEtBQUssRUFBRSxPQUFPLElBQ1gsUUFBUSxDQUNaLENBQUM7UUFDRixJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO1lBQzlCLElBQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsa0JBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjtRQUNELGtCQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFRLENBQUMsQ0FBQztRQUM3QixPQUFPLGtCQUFRLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0lBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=