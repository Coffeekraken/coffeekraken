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
        describe('sugar.js.is.ie', function () {
            afterEach(function () { jest_useragent_mock_1.clear(); });
            jest_useragent_mock_1.mockUserAgent('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)');
            it('Should detect the passed variable type correctly', function () {
                expect(__testFn()).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map