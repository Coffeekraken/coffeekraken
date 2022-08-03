"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const backgroundImageLoaded_1 = __importDefault(require("../load/backgroundImageLoaded"));
const dispatchEvent_1 = __importDefault(require("../event/dispatchEvent"));
describe('sugar.js.dom.backgroundImageLoaded', () => {
    document.body.innerHTML = `
    <style>
      .testing {
        background-image: url('/test.jpg');
      }
    </style>
    <div id="testing" class="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    let isLoaded = false, isError = false;
    const promise = (0, backgroundImageLoaded_1.default)($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    (0, dispatchEvent_1.default)(promise.__$img, 'load');
    it('Should detect the background image loading complete state', () => {
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEZBQW9FO0FBQ3BFLDJFQUFxRDtBQUVyRCxRQUFRLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFO0lBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHOzs7Ozs7O0dBT3pCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELElBQUksUUFBUSxHQUFHLEtBQUssRUFDbEIsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUVsQixNQUFNLE9BQU8sR0FBRyxJQUFBLCtCQUF1QixFQUFDLElBQUksQ0FBQztTQUMxQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNYLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7SUFFTCxJQUFBLHVCQUFlLEVBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV4QyxFQUFFLENBQUMsMkRBQTJELEVBQUUsR0FBRyxFQUFFO1FBQ25FLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=