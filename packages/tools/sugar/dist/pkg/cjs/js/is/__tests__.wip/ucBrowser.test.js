"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ucBrowser_1 = __importDefault(require("../ucBrowser"));
describe('sugar.js.is.ucBrowser', () => {
    afterEach(() => {
        clear();
    });
    mockUserAgent('Mozilla/5.0 (Linux; U; Android 6.0.1; zh-CN; F5121 Build/34.0.A.1.247) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 UCBrowser/11.5.1.944 Mobile Safari/537.36');
    it('Should detect the passed variable type correctly', () => {
        expect((0, ucBrowser_1.default)()).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXVDO0FBRXZDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFDbkMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNYLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7SUFDSCxhQUFhLENBQ1QseUxBQXlMLENBQzVMLENBQUM7SUFFRixFQUFFLENBQUMsa0RBQWtELEVBQUUsR0FBRyxFQUFFO1FBQ3hELE1BQU0sQ0FBQyxJQUFBLG1CQUFXLEdBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=