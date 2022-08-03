"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observeMutations_1 = __importDefault(require("../observeMutations"));
describe('sugar.js.dom.observeMutations', () => {
    document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    let mutationsCount = 0;
    (0, observeMutations_1.default)($elm).then((mutation) => {
        if (mutation.attributeName === 'plop' ||
            mutation.attributeName === 'hello') {
            mutationsCount++;
        }
    });
    $elm.setAttribute('plop', 'coco');
    $elm.setAttribute('hello', 'world');
    it('Should have detect all the mutations done on the $elm', () => {
        setTimeout(() => {
            expect(mutationsCount).toBe(2);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkVBQXFEO0FBRXJELFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDN0MsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7OztHQUd6QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFFdkIsSUFBQSwwQkFBa0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN6QyxJQUNFLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTTtZQUNqQyxRQUFRLENBQUMsYUFBYSxLQUFLLE9BQU8sRUFDbEM7WUFDQSxjQUFjLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFcEMsRUFBRSxDQUFDLHVEQUF1RCxFQUFFLEdBQUcsRUFBRTtRQUMvRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==