"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isVisible_1 = __importDefault(require("../isVisible"));
describe('sugar.js.dom.isVisible', () => {
    document.body.innerHTML = `
      <style>
        #testing {
          display: none;
        }
      </style>
      <div id="testing">
      </div>
      <div id="testing1"></div>
  `;
    const $elm = document.querySelector('#testing');
    const $elm1 = document.querySelector('#testing1');
    it('Should detect that the div #testing is not visible', () => {
        expect(isVisible_1.default($elm)).toBe(false);
    });
    it('Should detect that the div #testing1 is visible', () => {
        expect(isVisible_1.default($elm1)).toBe(true);
    });
});
