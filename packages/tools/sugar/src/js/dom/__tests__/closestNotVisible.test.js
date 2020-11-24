"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const closestNotVisible_1 = __importDefault(require("../closestNotVisible"));
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
        const $testing = closestNotVisible_1.default($elm, '.testing');
        expect($testing.id).toBe('testing');
    });
});
