"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_useragent_mock_1 = require("jest-useragent-mock");
module.exports = (__testFn) => {
    describe('sugar.js.is.samsungBrowser', () => {
        afterEach(() => { (0, jest_useragent_mock_1.clear)(); });
        (0, jest_useragent_mock_1.mockUserAgent)('Mozilla/5.0 (SMART-TV; Linux; Tizen 2.4.0) AppleWebkit/538.1 (KHTML, like Gecko) SamsungBrowser/1.1 TV Safari/538.1');
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTJEO0FBRTNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtJQUU1QixRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBRTFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFBLDJCQUFLLEdBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUEsbUNBQWEsRUFBQyxxSEFBcUgsQ0FBQyxDQUFDO1FBRXJJLEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7WUFDMUQsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==