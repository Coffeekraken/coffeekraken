"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getColorFor_1 = __importDefault(require("../getColorFor"));
describe('sugar.shared.dev.color.getColorFor', () => {
    it('Should return me a simple color', () => {
        const color = (0, getColorFor_1.default)('this');
        expect(typeof color).toBe('string');
    });
    it('Should return me a simple color every time the same for the passed ref', () => {
        const color = (0, getColorFor_1.default)('that');
        const color1 = (0, getColorFor_1.default)('that');
        expect(color).toBe(color1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUVBQTJDO0FBRzNDLFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7SUFDbEQsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRTtRQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFBLHFCQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLEdBQUcsRUFBRTtRQUNoRixNQUFNLEtBQUssR0FBRyxJQUFBLHFCQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBQSxxQkFBYSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9