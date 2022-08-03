"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const closestNotVisible_1 = __importDefault(require("../query/closestNotVisible"));
describe('sugar.js.dom.closestNotVisible', () => {
    document.body.innerHTML = `
  <style>
    #testing {
      display: none;
    }
  </style>
      <div id="testing">
        <div class="coco testing">
          <div id="source"></div>
        </div>
      </div>
  `;
    const $elm = document.querySelector('#source');
    it('Should find the "testing" element that is up in the dom tree', () => {
        const $testing = (0, closestNotVisible_1.default)($elm, '.testing');
        expect($testing.id).toBe('testing');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUZBQTZEO0FBRTdELFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7O0dBV3pCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRS9DLEVBQUUsQ0FBQyw4REFBOEQsRUFBRSxHQUFHLEVBQUU7UUFDdEUsTUFBTSxRQUFRLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9