"use strict";
/**
 * @jest-environment jsdom
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getHtmlClassFromTagName_1 = __importDefault(require("../getHtmlClassFromTagName"));
describe('sugar.js.html.getHtmlClassFromTagName', () => {
    it('Should get back the correct HTMLElement class from passed tags', (done) => {
        expect((0, getHtmlClassFromTagName_1.default)('a')).toBe(window.HTMLAnchorElement);
        expect((0, getHtmlClassFromTagName_1.default)('img')).toBe(window.HTMLImageElement);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCx5RkFBbUU7QUFFbkUsUUFBUSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtJQUNuRCxFQUFFLENBQUMsZ0VBQWdFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxRSxNQUFNLENBQUMsSUFBQSxpQ0FBeUIsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsSUFBQSxpQ0FBeUIsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV2RSxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==