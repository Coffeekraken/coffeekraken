"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderPath_js_1 = __importDefault(require("../folderPath.js"));
describe('sugar.node.fs.folderPath', () => {
    it('Should get a simple folder path correctly', () => {
        const path = (0, folderPath_js_1.default)(`${__dirname}/data/file.jpg`);
        expect(path).toBe(`${__dirname}/data`);
    });
    it('Should return false when checking for a non existing folder', () => {
        const path = (0, folderPath_js_1.default)(`${__dirname}/data/file111.jpg`, {
            checkExistence: true,
        });
        expect(path).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUVBQTRDO0FBQzVDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDdEMsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtRQUNqRCxNQUFNLElBQUksR0FBRyxJQUFBLHVCQUFZLEVBQUMsR0FBRyxTQUFTLGdCQUFnQixDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsNkRBQTZELEVBQUUsR0FBRyxFQUFFO1FBQ25FLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQVksRUFBQyxHQUFHLFNBQVMsbUJBQW1CLEVBQUU7WUFDdkQsY0FBYyxFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=