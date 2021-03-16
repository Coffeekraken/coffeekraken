var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../px2rem"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var px2rem_1 = __importDefault(require("../px2rem"));
    describe('sugar.js.unit.px2rem', function () {
        it('Should convert the passed px value to rem correctly', function () {
            expect(px2rem_1.default(32)).toBe(2);
        });
    });
});
//# sourceMappingURL=px2rem.test.js.map