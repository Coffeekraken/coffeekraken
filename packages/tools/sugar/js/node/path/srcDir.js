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
        var srcDir = sugar_1.default('storage.srcDir');
        if (srcDir !== undefined) {
            fs_extra_1.default.ensureDirSync(srcDir);
            return srcDir;
        }
        return undefined;
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvcGF0aC9zcmNEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwREFBNEM7SUFDNUMsc0RBQTRCO0lBOEI1QixtQkFBeUIsUUFBOEI7UUFBOUIseUJBQUEsRUFBQSxhQUE4QjtRQUNyRCxRQUFRLGdCQUNILFFBQVEsQ0FDWixDQUFDO1FBQ0YsSUFBTSxNQUFNLEdBQUcsZUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLGtCQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBVkQsNEJBVUMifQ==