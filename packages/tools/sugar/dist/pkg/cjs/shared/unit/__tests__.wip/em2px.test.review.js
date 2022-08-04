"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const em2px_1 = __importDefault(require("../em2px"));
describe('sugar.js.unit.em2px', () => {
    document.body.innerHTML = `
    <style>
      #testing {
        font-size: 10px;
      }
    </style>
    <div id="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should convert the passed em value to px correctly', () => {
        expect((0, em2px_1.default)(2, $elm)).toBe(20);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQStCO0FBRS9CLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFFbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7R0FPekIsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFaEQsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQUcsRUFBRTtRQUM1RCxNQUFNLENBQUMsSUFBQSxlQUFPLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==