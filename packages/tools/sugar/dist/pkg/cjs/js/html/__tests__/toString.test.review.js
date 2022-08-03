"use strict";
/**
 * @jest-environment jsdom
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const toString_1 = __importDefault(require("../toString"));
describe('sugar.js.html.toString', () => {
    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
    document.body.innerHTML = html;
    const $elm = document.querySelector('bold');
    const res = (0, toString_1.default)($elm);
    it('Should have transform the dom element to a string correctly', () => {
        expect(res).toBe('<bold>Hello world</bold>');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCxjQUFjO0FBRWQsMkRBQXFDO0FBRXJDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxJQUFJLEdBQUc7Ozs7Ozs7Q0FPaEIsQ0FBQztJQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUUvQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sR0FBRyxHQUFHLElBQUEsa0JBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUU3QixFQUFFLENBQUMsNkRBQTZELEVBQUUsR0FBRyxFQUFFO1FBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=