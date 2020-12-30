var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../scriptLoaded"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var scriptLoaded_1 = __importDefault(require("../scriptLoaded"));
    describe('sugar.js.dom.scriptLoaded', function () {
        document.head.innerHTML = "\n    <script type=\"text/javascript\" src=\"src/data/tests/testing.js\"></script>\n  ";
        var $elm = document.head.querySelector('script');
        var isLoaded = false, isError = false;
        scriptLoaded_1.default($elm)
            .then(function () {
            isLoaded = true;
        })
            .catch(function (e) {
            isError = true;
        });
        it('Should detect the script loading complete state', function () {
            $elm.onload();
            setTimeout(function () {
                expect(isLoaded).toBe(true);
                expect(isError).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=scriptLoaded.test.js.map