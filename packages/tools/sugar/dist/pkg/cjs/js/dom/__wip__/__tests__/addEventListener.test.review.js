"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addEventListener_1 = __importDefault(require("../event/addEventListener"));
const dispatchEvent_1 = __importDefault(require("../event/dispatchEvent"));
describe('sugar.js.dom.addEventListener', () => {
    let isCallbackCalled = false, isThenCalled = false, hasBeenReleased = false, hasBeenCanceled = false;
    let clickCount = 0;
    document.body.innerHTML = `
    <div id="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    const listener = (0, addEventListener_1.default)($elm, 'click', (event) => {
        isCallbackCalled = true;
    })
        .on('click', (event) => {
        isThenCalled = true;
        clickCount++;
    })
        .finally((event) => {
        hasBeenReleased = true;
    })
        .on('cancel', (event) => {
        hasBeenCanceled = true;
    });
    (0, dispatchEvent_1.default)($elm, 'click');
    // release the listener
    listener.cancel();
    setTimeout(() => {
        (0, dispatchEvent_1.default)($elm, 'click');
    });
    it('Should have register the listener correctly and called as expected', (done) => {
        expect(isCallbackCalled).toBe(true);
        expect(isThenCalled).toBe(true);
        expect(clickCount).toBe(1);
        expect(hasBeenCanceled).toBe(true);
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUZBQTJEO0FBQzNELDJFQUFxRDtBQUVyRCxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO0lBQzdDLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxFQUMxQixZQUFZLEdBQUcsS0FBSyxFQUNwQixlQUFlLEdBQUcsS0FBSyxFQUN2QixlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzFCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztJQUVuQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7R0FFekIsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBQSwwQkFBa0IsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDM0QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUMsQ0FBQztTQUNDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNyQixZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLFVBQVUsRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDO1NBQ0QsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDakIsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDLENBQUM7U0FDRCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdEIsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVMLElBQUEsdUJBQWUsRUFBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFL0IsdUJBQXVCO0lBQ3ZCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVsQixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsSUFBQSx1QkFBZSxFQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvRUFBb0UsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2hGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==