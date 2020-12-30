var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../observeMutations"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var observeMutations_1 = __importDefault(require("../observeMutations"));
    describe('sugar.js.dom.observeMutations', function () {
        document.body.innerHTML = "\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        var mutationsCount = 0;
        observeMutations_1.default($elm).then(function (mutation) {
            if (mutation.attributeName === 'plop' ||
                mutation.attributeName === 'hello') {
                mutationsCount++;
            }
        });
        $elm.setAttribute('plop', 'coco');
        $elm.setAttribute('hello', 'world');
        it('Should have detect all the mutations done on the $elm', function () {
            setTimeout(function () {
                expect(mutationsCount).toBe(2);
            });
        });
    });
});
//# sourceMappingURL=observeMutations.test.js.map