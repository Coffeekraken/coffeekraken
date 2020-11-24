"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const closest_1 = __importDefault(require("../closest"));
describe('sugar.js.dom.closest', () => {
    document.body.innerHTML = `
      <div id="testing">
        <div class="coco">
          <div id="source"></div>
        </div>
      </div>
  `;
    const $elm = document.querySelector('#source');
    it('Should find the "testing" element that is up in the dom tree', () => {
        const $testing = closest_1.default($elm, '#testing');
        expect($testing.id).toBe('testing');
    });
});
