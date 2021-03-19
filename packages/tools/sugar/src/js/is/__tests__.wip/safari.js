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
        describe('sugar.js.is.safari', function () {
            afterEach(function () { jest_useragent_mock_1.clear(); });
            jest_useragent_mock_1.mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1');
            it('Should detect the passed variable type correctly', function () {
                expect(__testFn()).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmYXJpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FmYXJpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsMkRBQTJEO0lBRTNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxRQUFRO1FBRXhCLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtZQUU3QixTQUFTLENBQUMsY0FBUSwyQkFBSyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixtQ0FBYSxDQUFDLHlJQUF5SSxDQUFDLENBQUM7WUFFekosRUFBRSxDQUFDLGtEQUFrRCxFQUFFO2dCQUNyRCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQSJ9