var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../backgroundImageLoaded", "../dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var backgroundImageLoaded_1 = __importDefault(require("../backgroundImageLoaded"));
    var dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
    describe('sugar.js.dom.backgroundImageLoaded', function () {
        document.body.innerHTML = "\n    <style>\n      .testing {\n        background-image: url('/test.jpg');\n      }\n    </style>\n    <div id=\"testing\" class=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        var isLoaded = false, isError = false;
        var promise = backgroundImageLoaded_1.default($elm)
            .then(function () {
            isLoaded = true;
        })
            .catch(function (e) {
            isError = true;
        });
        dispatchEvent_1.default(promise.__$img, 'load');
        it('Should detect the background image loading complete state', function () {
            setTimeout(function () {
                expect(isLoaded).toBe(true);
                expect(isError).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=module.js.map