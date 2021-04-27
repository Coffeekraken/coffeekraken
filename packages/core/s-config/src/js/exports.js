var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
        define(["require", "exports", "../shared/adapters/SConfigAdapter", "./adapters/SConfigLsAdapter", "../shared/SConfig", "../shared/adapters/SConfigAdapter", "./adapters/SConfigLsAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SConfigLsAdapter = exports.SConfigAdapter = void 0;
    const SConfigAdapter_1 = __importDefault(require("../shared/adapters/SConfigAdapter"));
    exports.SConfigAdapter = SConfigAdapter_1.default;
    const SConfigLsAdapter_1 = __importDefault(require("./adapters/SConfigLsAdapter"));
    exports.SConfigLsAdapter = SConfigLsAdapter_1.default;
    const SConfig_1 = __importDefault(require("../shared/SConfig"));
    __exportStar(require("../shared/adapters/SConfigAdapter"), exports);
    __exportStar(require("./adapters/SConfigLsAdapter"), exports);
    exports.default = SConfig_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHVGQUErRDtJQU90RCx5QkFQRix3QkFBYyxDQU9FO0lBTnZCLG1GQUEyRDtJQU1sQywyQkFObEIsMEJBQWdCLENBTWtCO0lBTHpDLGdFQUF3QztJQUV4QyxvRUFBa0Q7SUFDbEQsOERBQTRDO0lBRzVDLGtCQUFlLGlCQUFPLENBQUMifQ==