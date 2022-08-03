"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageLoaded_1 = __importDefault(require("../load/imageLoaded"));
const dispatchEvent_1 = __importDefault(require("../event/dispatchEvent"));
describe('sugar.js.dom.imageLoaded', () => {
    document.head.innerHTML = `
    <img src="src/data/tests/testing.jpg" />
  `;
    const $elm = document.head.querySelector('img');
    let isLoaded = false, isError = false;
    (0, imageLoaded_1.default)($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    (0, dispatchEvent_1.default)($elm, 'load');
    it('Should detect the image loading complete state', () => {
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQWdEO0FBQ2hELDJFQUFxRDtBQUVyRCxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHOztHQUV6QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFaEQsSUFBSSxRQUFRLEdBQUcsS0FBSyxFQUNsQixPQUFPLEdBQUcsS0FBSyxDQUFDO0lBRWxCLElBQUEscUJBQWEsRUFBQyxJQUFJLENBQUM7U0FDaEIsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNULFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDWCxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUwsSUFBQSx1QkFBZSxFQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU5QixFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO1FBQ3hELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=