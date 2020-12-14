var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../imageLoaded", "../dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var imageLoaded_1 = __importDefault(require("../imageLoaded"));
    var dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
    describe('sugar.js.dom.imageLoaded', function () {
        document.head.innerHTML = "\n    <img src=\"src/data/tests/testing.jpg\" />\n  ";
        var $elm = document.head.querySelector('img');
        var isLoaded = false, isError = false;
        imageLoaded_1.default($elm)
            .then(function () {
            isLoaded = true;
        })
            .catch(function (e) {
            isError = true;
        });
        dispatchEvent_1.default($elm, 'load');
        it('Should detect the image loading complete state', function () {
            setTimeout(function () {
                expect(isLoaded).toBe(true);
                expect(isError).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=module.js.map