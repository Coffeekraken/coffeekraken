"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_useragent_mock_1 = require("jest-useragent-mock");
module.exports = (__testFn) => {
    describe('sugar.js.is.safari', () => {
        afterEach(() => { (0, jest_useragent_mock_1.clear)(); });
        (0, jest_useragent_mock_1.mockUserAgent)('Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1');
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTJEO0FBRTNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtJQUU1QixRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1FBRWxDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFBLDJCQUFLLEdBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUEsbUNBQWEsRUFBQyx5SUFBeUksQ0FBQyxDQUFDO1FBRXpKLEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7WUFDMUQsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==