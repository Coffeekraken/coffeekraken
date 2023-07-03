"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const striptags_1 = __importDefault(require("../striptags"));
describe('sugar.shared.html.striptags', () => {
    const html = `<div><bold>Hello world</bold><h1>How are you?</h1></div>`;
    const res = (0, striptags_1.default)(html, '<bold>');
    it('Should have replace the tags correctly', () => {
        expect(res).toBe('<bold>Hello world</bold>How are you?');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXVDO0FBRXZDLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsTUFBTSxJQUFJLEdBQUcsMERBQTBELENBQUM7SUFFeEUsTUFBTSxHQUFHLEdBQUcsSUFBQSxtQkFBVyxFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUV4QyxFQUFFLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxFQUFFO1FBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=