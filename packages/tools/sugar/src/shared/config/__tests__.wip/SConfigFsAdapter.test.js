var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../adapters/SConfigFsAdapter", "../SConfig"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SConfigFsAdapter_1 = __importDefault(require("../adapters/SConfigFsAdapter"));
    const SConfig_1 = __importDefault(require("../SConfig"));
    require('./SConfigFsAdapter')(SConfig_1.default, SConfigFsAdapter_1.default);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZzQWRhcHRlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbmZpZ0ZzQWRhcHRlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsb0ZBQThEO0lBQzlELHlEQUFtQztJQUNuQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxpQkFBUyxFQUFFLDBCQUFrQixDQUFDLENBQUMifQ==