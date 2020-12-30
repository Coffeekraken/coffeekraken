var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../isVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isVisible_1 = __importDefault(require("../isVisible"));
    describe('sugar.js.dom.isVisible', function () {
        document.body.innerHTML = "\n      <style>\n        #testing {\n          display: none;\n        }\n      </style>\n      <div id=\"testing\">\n      </div>\n      <div id=\"testing1\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        var $elm1 = document.querySelector('#testing1');
        it('Should detect that the div #testing is not visible', function () {
            expect(isVisible_1.default($elm)).toBe(false);
        });
        it('Should detect that the div #testing1 is visible', function () {
            expect(isVisible_1.default($elm1)).toBe(true);
        });
    });
});
//# sourceMappingURL=isVisible.test.js.map