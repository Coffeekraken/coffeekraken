var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
    describe('sugar.js.dom.dispatchEvent', function () {
        document.body.innerHTML = "\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        var isDetected = false;
        $elm.addEventListener('coco', function (e) {
            if (!e.detail.custom)
                return;
            isDetected = true;
        });
        dispatchEvent_1.default($elm, 'coco', {
            custom: true
        });
        it('Should detect the dispatched custom event with custom data attached', function () {
            expect(isDetected).toBe(true);
        });
    });
});
//# sourceMappingURL=dispatchEvent.test.js.map