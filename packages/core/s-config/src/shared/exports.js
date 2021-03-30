var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SConfig", "./adapters/SConfigAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SConfigAdapter = void 0;
    const SConfig_1 = __importDefault(require("./SConfig"));
    const SConfigAdapter_1 = __importDefault(require("./adapters/SConfigAdapter"));
    exports.SConfigAdapter = SConfigAdapter_1.default;
    // export * from './SConfig';
    exports.default = SConfig_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsd0RBQWtDO0lBQ2xDLCtFQUF5RDtJQUM1Qix5QkFEdEIsd0JBQWdCLENBQ29CO0lBRTNDLDZCQUE2QjtJQUM3QixrQkFBZSxpQkFBUyxDQUFDIn0=