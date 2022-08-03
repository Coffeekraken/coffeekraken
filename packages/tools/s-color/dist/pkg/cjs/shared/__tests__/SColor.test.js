"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SColor_1 = __importDefault(require("../SColor"));
describe('s-color.shared', () => {
    it('Should parse and return the same color when passing hexa value in', () => {
        const color = new SColor_1.default('#ff00ff');
        expect(color.toString()).toBe('#FF00FF');
    });
    it('Should parse and return the same color when passing hsl value in', () => {
        const color = new SColor_1.default('hsl(257,25,50)');
        expect(color.toString()).toBe('#72609F');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdURBQWlDO0FBRWpDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7SUFDNUIsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLEdBQUcsRUFBRTtRQUN6RSxNQUFNLEtBQUssR0FBRyxJQUFJLGdCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRSxHQUFHLEVBQUU7UUFDeEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxnQkFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=