var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../px2em"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var px2em_1 = __importDefault(require("../px2em"));
    describe('sugar.js.unit.px2em', function () {
        document.body.innerHTML = "\n    <style>\n      #testing {\n        font-size: 10px;\n      }\n    </style>\n    <div id=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        it('Should convert the passed px value to em correctly', function () {
            expect(px2em_1.default(20, $elm)).toBe(2);
        });
    });
});
//# sourceMappingURL=px2em.test.js.map