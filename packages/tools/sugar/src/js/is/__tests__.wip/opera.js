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
        describe('sugar.js.is.opera', function () {
            afterEach(function () { jest_useragent_mock_1.clear(); });
            jest_useragent_mock_1.mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36 OPR/67.0.3575.137');
            it('Should detect the passed variable type correctly', function () {
                expect(__testFn()).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcGVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQUEyRDtJQUUzRCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQUMsUUFBUTtRQUV4QixRQUFRLENBQUMsbUJBQW1CLEVBQUU7WUFFNUIsU0FBUyxDQUFDLGNBQVEsMkJBQUssRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsbUNBQWEsQ0FBQyxzSUFBc0ksQ0FBQyxDQUFDO1lBRXRKLEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtnQkFDckQsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUEifQ==