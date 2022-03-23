// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../monorepo/all"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const all_1 = __importDefault(require("../monorepo/all"));
    exports.default = (stringArgs = '') => {
        (0, all_1.default)(stringArgs);
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ub3JlcG8uY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9ub3JlcG8uY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUEyQztJQUMzQyxrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNqQyxJQUFBLGFBQVksRUFBQyxVQUFVLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMifQ==