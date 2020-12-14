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
        describe('sugar.js.is.ucBrowser', function () {
            afterEach(function () { jest_useragent_mock_1.clear(); });
            jest_useragent_mock_1.mockUserAgent('Mozilla/5.0 (Linux; U; Android 6.0.1; zh-CN; F5121 Build/34.0.A.1.247) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 UCBrowser/11.5.1.944 Mobile Safari/537.36');
            it('Should detect the passed variable type correctly', function () {
                expect(__testFn()).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map