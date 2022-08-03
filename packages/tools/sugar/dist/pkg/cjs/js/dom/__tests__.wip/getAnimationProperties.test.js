"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAnimationProperties_1 = __importDefault(require("../style/getAnimationProperties"));
describe('sugar.js.dom.getAnimationProperties', () => {
    document.body.innerHTML = `
  <style>
    @keyframes coco {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    #testing {
      animation: coco 2s ease-in-out;
      animation-name: coco;
    }
  </style>
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    const props = (0, getAnimationProperties_1.default)($elm);
    it('Should find the "testing" element that is up in the dom tree', () => {
        //  expect($testing.id).toBe('testing');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkZBQXVFO0FBRXZFLFFBQVEsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLEVBQUU7SUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJ6QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxNQUFNLEtBQUssR0FBRyxJQUFBLGdDQUF3QixFQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdDLEVBQUUsQ0FBQyw4REFBOEQsRUFBRSxHQUFHLEVBQUU7UUFDdEUsd0NBQXdDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==