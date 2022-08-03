"use strict";
/**
 * @jest-environment jsdom
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const getTagNameFromHtmlClass_1 = __importDefault(require("../getTagNameFromHtmlClass"));
describe('sugar.js.html.getTagNameFromHtmlClass', () => {
    it('Should get back the correct tagname from passed classes', (done) => {
        expect((0, getTagNameFromHtmlClass_1.default)(HTMLAnchorElement)).toBe('a');
        expect((0, getTagNameFromHtmlClass_1.default)(HTMLLinkElement)).toBe('link');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCxjQUFjO0FBRWQseUZBQW1FO0FBRW5FLFFBQVEsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7SUFDbkQsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkUsTUFBTSxDQUFDLElBQUEsaUNBQXlCLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsSUFBQSxpQ0FBeUIsRUFBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVoRSxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==