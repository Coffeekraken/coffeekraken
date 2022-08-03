"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detectInOutDirection_1 = __importDefault(require("../detection/detectInOutDirection"));
const dispatchEvent_1 = __importDefault(require("../event/dispatchEvent"));
describe('sugar.js.dom.detectInOutDirection', () => {
    document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    let isInTriggered = false, isOutTriggered = false, isThenTriggered = false;
    (0, detectInOutDirection_1.default)($elm)
        .on('in', (direction) => {
        isInTriggered = true;
    })
        .on('out', (direction) => {
        isOutTriggered = true;
    })
        .then((value) => {
        isThenTriggered = true;
    });
    (0, dispatchEvent_1.default)($elm, 'mouseenter');
    (0, dispatchEvent_1.default)($elm, 'mouseleave');
    it('Should have trigger the "in" stack correctly', () => {
        setTimeout(() => {
            expect(isInTriggered).toBe(true);
        });
    });
    it('Should have trigger the "out" stack correctly', () => {
        setTimeout(() => {
            expect(isOutTriggered).toBe(true);
        });
    });
    it('Should have trigger the "then" stack correctly', () => {
        setTimeout(() => {
            expect(isThenTriggered).toBe(true);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkZBQXVFO0FBQ3ZFLDJFQUFxRDtBQUVyRCxRQUFRLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxFQUFFO0lBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHOzs7R0FHekIsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFaEQsSUFBSSxhQUFhLEdBQUcsS0FBSyxFQUN2QixjQUFjLEdBQUcsS0FBSyxFQUN0QixlQUFlLEdBQUcsS0FBSyxDQUFDO0lBRTFCLElBQUEsOEJBQXNCLEVBQUMsSUFBSSxDQUFDO1NBQ3pCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN0QixhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztTQUNELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN2QixjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2QsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVMLElBQUEsdUJBQWUsRUFBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDcEMsSUFBQSx1QkFBZSxFQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUVwQyxFQUFFLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO1FBQ3RELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsK0NBQStDLEVBQUUsR0FBRyxFQUFFO1FBQ3ZELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO1FBQ3hELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9