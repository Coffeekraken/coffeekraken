"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_useragent_mock_1 = require("jest-useragent-mock");
module.exports = (__testFn) => {
    describe('sugar.js.is.chrome', () => {
        afterEach(() => { (0, jest_useragent_mock_1.clear)(); });
        (0, jest_useragent_mock_1.mockUserAgent)('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTJEO0FBRTNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtJQUU1QixRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1FBRWxDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFBLDJCQUFLLEdBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUEsbUNBQWEsRUFBQyxxSEFBcUgsQ0FBQyxDQUFDO1FBRXJJLEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7WUFDMUQsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==