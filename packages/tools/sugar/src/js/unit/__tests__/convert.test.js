var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var convert_1 = __importDefault(require("../convert"));
    describe('sugar.js.unit.convert', function () {
        document.body.innerHTML = "\n    <style>\n      #testing {\n        font-size: 10px;\n      }\n    </style>\n    <div id=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        it('Should convert the passed em value to px correctly', function () {
            expect(convert_1.default('2em', 'px', $elm)).toBe(20);
        });
        it('Should convert the passed rem value to px correctly', function () {
            expect(convert_1.default('2rem', 'px')).toBe(32);
        });
        it('Should convert the passed px value to em correctly', function () {
            expect(convert_1.default('20px', 'em', $elm)).toBe(2);
        });
        it('Should convert the passed px value to em correctly', function () {
            expect(convert_1.default('32px', 'rem')).toBe(2);
        });
    });
});
//# sourceMappingURL=convert.test.js.map