"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_useragent_mock_1 = require("jest-useragent-mock");
module.exports = (__testFn) => {
    describe('sugar.js.is.chrome', () => {
        afterEach(() => { (0, jest_useragent_mock_1.clear)(); });
        (0, jest_useragent_mock_1.mockUserAgent)('Mozilla/5.0 (Linux; Android 6.0; Lenovo K50a40 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.137 YaBrowser/17.4.1.352.00 Mobile Safari/537.36');
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTJEO0FBRTNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtJQUU1QixRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1FBRWxDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFBLDJCQUFLLEdBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUEsbUNBQWEsRUFBQyx1S0FBdUssQ0FBQyxDQUFDO1FBRXZMLEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7WUFDMUQsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUEifQ==