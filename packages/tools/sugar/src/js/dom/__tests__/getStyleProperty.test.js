var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../getStyleProperty"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getStyleProperty_1 = __importDefault(require("../getStyleProperty"));
    describe('sugar.js.dom.getStyleProperty', function () {
        document.body.innerHTML = "\n      <style>\n          #testing {\n            content: 'hello world';\n            animation: coco 2s ease-in-out 3s;\n          }\n      </style>\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        it('Should get the "content" css property correctly', function () {
            expect(getStyleProperty_1.default($elm, 'content')).toBe('hello world');
        });
        it('Should get the "animation" css property correctly', function () {
            expect(getStyleProperty_1.default($elm, 'animation')).toBe('coco 2s ease-in-out 3s');
        });
    });
});
//# sourceMappingURL=module.js.map