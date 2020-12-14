var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../rem2px"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var rem2px_1 = __importDefault(require("../rem2px"));
    describe('sugar.js.unit.rem2px', function () {
        it('Should convert the passed rem value to px correctly', function () {
            expect(rem2px_1.default(2)).toBe(32);
        });
    });
});
//# sourceMappingURL=module.js.map