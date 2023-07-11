"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filename_js_1 = __importDefault(require("../filename.js"));
describe('sugar.node.fs.filename', () => {
    it('Should get the filename from a simple file name', () => {
        expect((0, filename_js_1.default)('hello/plop.txt')).toBe('plop.txt');
    });
    it('Should get the filename without extension from a simple file name', () => {
        expect((0, filename_js_1.default)('hello/plop.txt', false)).toBe('plop');
    });
    it('Should get the filename from a more complex file name', () => {
        expect((0, filename_js_1.default)('hello/plop.something.txt')).toBe('plop.something.txt');
    });
    it('Should get the filename withouth extension from a more complex file name', () => {
        expect((0, filename_js_1.default)('hello/plop.something.txt', false)).toBe('plop.something');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUVBQXdDO0FBQ3hDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtRQUN2RCxNQUFNLENBQUMsSUFBQSxxQkFBVSxFQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsbUVBQW1FLEVBQUUsR0FBRyxFQUFFO1FBQ3pFLE1BQU0sQ0FBQyxJQUFBLHFCQUFVLEVBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsdURBQXVELEVBQUUsR0FBRyxFQUFFO1FBQzdELE1BQU0sQ0FBQyxJQUFBLHFCQUFVLEVBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDL0Msb0JBQW9CLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywwRUFBMEUsRUFBRSxHQUFHLEVBQUU7UUFDaEYsTUFBTSxDQUFDLElBQUEscUJBQVUsRUFBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDdEQsZ0JBQWdCLENBQ25CLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=