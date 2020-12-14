var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../getAnimationProperties"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getAnimationProperties_1 = __importDefault(require("../getAnimationProperties"));
    describe('sugar.js.dom.getAnimationProperties', function () {
        document.body.innerHTML = "\n  <style>\n    @keyframes coco {\n      from {\n        opacity: 0;\n      }\n      to {\n        opacity: 1;\n      }\n    }\n    #testing {\n      animation: coco 2s ease-in-out;\n      animation-name: coco;\n    }\n  </style>\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        var props = getAnimationProperties_1.default($elm);
        it('Should find the "testing" element that is up in the dom tree', function () {
            //  expect($testing.id).toBe('testing');
        });
    });
});
//# sourceMappingURL=module.js.map