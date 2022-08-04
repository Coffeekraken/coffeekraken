"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filename_1 = __importDefault(require("../filename"));
describe('sugar.node.fs.filename', () => {
    it('Should get the filename from a simple file name', () => {
        expect((0, filename_1.default)('hello/plop.txt')).toBe('plop.txt');
    });
    it('Should get the filename without extension from a simple file name', () => {
        expect((0, filename_1.default)('hello/plop.txt', false)).toBe('plop');
    });
    it('Should get the filename from a more complex file name', () => {
        expect((0, filename_1.default)('hello/plop.something.txt')).toBe('plop.something.txt');
    });
    it('Should get the filename withouth extension from a more complex file name', () => {
        expect((0, filename_1.default)('hello/plop.something.txt', false)).toBe('plop.something');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQXFDO0FBQ3JDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtRQUN2RCxNQUFNLENBQUMsSUFBQSxrQkFBVSxFQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsbUVBQW1FLEVBQUUsR0FBRyxFQUFFO1FBQ3pFLE1BQU0sQ0FBQyxJQUFBLGtCQUFVLEVBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsdURBQXVELEVBQUUsR0FBRyxFQUFFO1FBQzdELE1BQU0sQ0FBQyxJQUFBLGtCQUFVLEVBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDL0Msb0JBQW9CLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywwRUFBMEUsRUFBRSxHQUFHLEVBQUU7UUFDaEYsTUFBTSxDQUFDLElBQUEsa0JBQVUsRUFBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDdEQsZ0JBQWdCLENBQ25CLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=