var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../em2px"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var em2px_1 = __importDefault(require("../em2px"));
    describe('sugar.js.unit.em2px', function () {
        document.body.innerHTML = "\n    <style>\n      #testing {\n        font-size: 10px;\n      }\n    </style>\n    <div id=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        it('Should convert the passed em value to px correctly', function () {
            expect(em2px_1.default(2, $elm)).toBe(20);
        });
    });
});
//# sourceMappingURL=em2px.test.js.map