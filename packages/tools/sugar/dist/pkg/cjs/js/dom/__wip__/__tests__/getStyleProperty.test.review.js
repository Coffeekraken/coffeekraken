"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStyleProperty_1 = __importDefault(require("../style/getStyleProperty"));
describe('sugar.js.dom.getStyleProperty', () => {
    document.body.innerHTML = `
      <style>
          #testing {
            content: 'hello world';
            animation: coco 2s ease-in-out 3s;
          }
      </style>
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should get the "content" css property correctly', () => {
        expect((0, getStyleProperty_1.default)($elm, 'content')).toBe('hello world');
    });
    it('Should get the "animation" css property correctly', () => {
        expect((0, getStyleProperty_1.default)($elm, 'animation')).toBe('coco 2s ease-in-out 3s');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUZBQTJEO0FBRTNELFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDN0MsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7OztHQVN6QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO1FBQ3pELE1BQU0sQ0FBQyxJQUFBLDBCQUFrQixFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxHQUFHLEVBQUU7UUFDM0QsTUFBTSxDQUFDLElBQUEsMEJBQWtCLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNoRCx3QkFBd0IsQ0FDekIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==