"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileHashSync_js_1 = __importDefault(require("../fileHashSync.js"));
describe('sugar.node.fs.fileHash', () => {
    it('Should a simple file correctly', () => {
        const hash = (0, fileHashSync_js_1.default)(`${__dirname}/data/3cb8876846e7c0e13896d23496ff7ac2.gif`);
        expect(hash).toBe('o8qZgS5PxHPPNasVn3Be0lvxK7mtKaMVgUtTntgS7Pw=');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUVBQWdEO0FBQ2hELFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUN0QyxNQUFNLElBQUksR0FBRyxJQUFBLHlCQUFjLEVBQ3ZCLEdBQUcsU0FBUyw0Q0FBNEMsQ0FDM0QsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUN0RSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=