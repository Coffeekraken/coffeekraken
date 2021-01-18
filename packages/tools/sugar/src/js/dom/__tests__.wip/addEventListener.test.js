var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../addEventListener", "../dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var addEventListener_1 = __importDefault(require("../addEventListener"));
    var dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
    describe('sugar.js.dom.addEventListener', function () {
        var isCallbackCalled = false, isThenCalled = false, hasBeenReleased = false, hasBeenCanceled = false;
        var clickCount = 0;
        document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        var listener = addEventListener_1.default($elm, 'click', function (event) {
            isCallbackCalled = true;
        })
            .on('click', function (event) {
            isThenCalled = true;
            clickCount++;
        })
            .finally(function (event) {
            hasBeenReleased = true;
        })
            .on('cancel', function (event) {
            hasBeenCanceled = true;
        });
        dispatchEvent_1.default($elm, 'click');
        // release the listener
        listener.cancel();
        setTimeout(function () {
            dispatchEvent_1.default($elm, 'click');
        });
        it('Should have register the listener correctly and called as expected', function (done) {
            expect(isCallbackCalled).toBe(true);
            expect(isThenCalled).toBe(true);
            expect(clickCount).toBe(1);
            expect(hasBeenCanceled).toBe(true);
            done();
        });
    });
});
//# sourceMappingURL=addEventListener.test.js.map