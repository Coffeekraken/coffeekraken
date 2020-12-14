(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jest-useragent-mock"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jest_useragent_mock_1 = require("jest-useragent-mock");
    module.exports = function (__testFn) {
        describe('sugar.js.is.tablet', function () {
            afterEach(function () { jest_useragent_mock_1.clear(); });
            jest_useragent_mock_1.mockUserAgent('Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
            it('Should detect the passed variable type correctly', function () {
                expect(__testFn()).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map