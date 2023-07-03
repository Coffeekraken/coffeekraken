"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pickRandom_1 = __importDefault(require("../pickRandom"));
const ar = [
    'hello 1',
    'hello 2',
    'hello 3',
    'hello 4'
];
const obj = {
    plop: true
};
const arObj = [
    obj, obj, obj, obj
];
describe('sugar.shared.array.pickRandom', () => {
    it('Should pick 1 random item correctly', () => {
        const item = (0, pickRandom_1.default)(ar, 1);
        expect(item.slice(0, 5)).toBe('hello');
    });
    it('Should pick 3 random items correctly', () => {
        const items = (0, pickRandom_1.default)(ar, 3);
        expect(items.length).toBe(3);
    });
    it('Should return the complete array if asked items is greater than the array lenght', () => {
        const items = (0, pickRandom_1.default)(ar, 10);
        expect(items.length).toBe(4);
    });
    it('Should not fall in an infinite loop if all array items are the same object', () => {
        const items = (0, pickRandom_1.default)(arObj, 2);
        expect(items.length).toBe(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQXlDO0FBRXpDLE1BQU0sRUFBRSxHQUFHO0lBQ1AsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNaLENBQUE7QUFFRCxNQUFNLEdBQUcsR0FBRztJQUNSLElBQUksRUFBRSxJQUFJO0NBQ2IsQ0FBQTtBQUNELE1BQU0sS0FBSyxHQUFHO0lBQ1YsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztDQUNyQixDQUFDO0FBR0YsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUMzQyxFQUFFLENBQUMscUNBQXFDLEVBQUUsR0FBRyxFQUFFO1FBQzNDLE1BQU0sSUFBSSxHQUFHLElBQUEsb0JBQVksRUFBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLEdBQUcsRUFBRTtRQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFBLG9CQUFZLEVBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLGtGQUFrRixFQUFFLEdBQUcsRUFBRTtRQUN4RixNQUFNLEtBQUssR0FBRyxJQUFBLG9CQUFZLEVBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDRFQUE0RSxFQUFFLEdBQUcsRUFBRTtRQUNsRixNQUFNLEtBQUssR0FBRyxJQUFBLG9CQUFZLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==