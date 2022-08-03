"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matches_1 = __importDefault(require("../query/matches"));
describe('sugar.js.dom.matches', () => {
    document.body.innerHTML = `
      <div id="testing" class="hello-world coco">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should return true on the match testing', () => {
        expect((0, matches_1.default)($elm, '.hello-world, .coco')).toBe(true);
    });
    it('Should return false on the match testing', () => {
        expect((0, matches_1.default)($elm, '.hello-wold, .coco')).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQXlDO0FBRXpDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7OztHQUd6QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxFQUFFLENBQUMseUNBQXlDLEVBQUUsR0FBRyxFQUFFO1FBQ2pELE1BQU0sQ0FBQyxJQUFBLGlCQUFTLEVBQUMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBRyxFQUFFO1FBQ2xELE1BQU0sQ0FBQyxJQUFBLGlCQUFTLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9