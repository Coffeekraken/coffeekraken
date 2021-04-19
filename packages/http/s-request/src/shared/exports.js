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
        define(["require", "exports", "./SRequest", "./SRequestConfig", "./request", "./SRequest", "./SRequestConfig"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.request = exports.SRequestConfig = void 0;
    const SRequest_1 = __importDefault(require("./SRequest"));
    const SRequestConfig_1 = __importDefault(require("./SRequestConfig"));
    exports.SRequestConfig = SRequestConfig_1.default;
    const request_1 = __importDefault(require("./request"));
    exports.request = request_1.default;
    __exportStar(require("./SRequest"), exports);
    __exportStar(require("./SRequestConfig"), exports);
    exports.default = SRequest_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLDBEQUFrQztJQUNsQyxzRUFBOEM7SUFNckMseUJBTkYsd0JBQWMsQ0FNRTtJQUx2Qix3REFBZ0M7SUFLUCxrQkFMbEIsaUJBQU8sQ0FLa0I7SUFIaEMsNkNBQTJCO0lBQzNCLG1EQUFpQztJQUdqQyxrQkFBZSxrQkFBUSxDQUFDIn0=