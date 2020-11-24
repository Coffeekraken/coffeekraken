"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_useragent_mock_1 = require("jest-useragent-mock");
module.exports = (__testFn) => {
    describe('sugar.js.is.chrome', () => {
        afterEach(() => { jest_useragent_mock_1.clear(); });
        jest_useragent_mock_1.mockUserAgent('Mozilla/5.0 (Linux; Android 6.0; Lenovo K50a40 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.137 YaBrowser/17.4.1.352.00 Mobile Safari/537.36');
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
