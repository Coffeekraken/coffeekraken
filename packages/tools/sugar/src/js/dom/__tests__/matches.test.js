"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matches_1 = __importDefault(require("../matches"));
describe('sugar.js.dom.matches', () => {
    document.body.innerHTML = `
      <div id="testing" class="hello-world coco">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should return true on the match testing', () => {
        expect(matches_1.default($elm, '.hello-world, .coco')).toBe(true);
    });
    it('Should return false on the match testing', () => {
        expect(matches_1.default($elm, '.hello-wold, .coco')).toBe(true);
    });
});
