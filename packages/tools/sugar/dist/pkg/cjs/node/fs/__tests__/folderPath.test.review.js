"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderPath_1 = __importDefault(require("../folderPath"));
describe('sugar.node.fs.folderPath', () => {
    it('Should get a simple folder path correctly', () => {
        const path = (0, folderPath_1.default)(`${__dirname}/data/file.jpg`);
        expect(path).toBe(`${__dirname}/data`);
    });
    it('Should return false when checking for a non existing folder', () => {
        const path = (0, folderPath_1.default)(`${__dirname}/data/file111.jpg`, true);
        expect(path).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQXlDO0FBQ3pDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDdEMsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtRQUNqRCxNQUFNLElBQUksR0FBRyxJQUFBLG9CQUFZLEVBQUMsR0FBRyxTQUFTLGdCQUFnQixDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsNkRBQTZELEVBQUUsR0FBRyxFQUFFO1FBQ25FLE1BQU0sSUFBSSxHQUFHLElBQUEsb0JBQVksRUFBQyxHQUFHLFNBQVMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=