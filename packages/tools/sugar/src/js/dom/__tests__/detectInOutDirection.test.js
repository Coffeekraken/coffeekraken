var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../detectInOutDirection", "../dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var detectInOutDirection_1 = __importDefault(require("../detectInOutDirection"));
    var dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
    describe('sugar.js.dom.detectInOutDirection', function () {
        document.body.innerHTML = "\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        var isInTriggered = false, isOutTriggered = false, isThenTriggered = false;
        detectInOutDirection_1.default($elm)
            .on('in', function (direction) {
            isInTriggered = true;
        })
            .on('out', function (direction) {
            isOutTriggered = true;
        })
            .then(function (value) {
            isThenTriggered = true;
        });
        dispatchEvent_1.default($elm, 'mouseenter');
        dispatchEvent_1.default($elm, 'mouseleave');
        it('Should have trigger the "in" stack correctly', function () {
            setTimeout(function () {
                expect(isInTriggered).toBe(true);
            });
        });
        it('Should have trigger the "out" stack correctly', function () {
            setTimeout(function () {
                expect(isOutTriggered).toBe(true);
            });
        });
        it('Should have trigger the "then" stack correctly', function () {
            setTimeout(function () {
                expect(isThenTriggered).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=detectInOutDirection.test.js.map