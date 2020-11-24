"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const px2em_1 = __importDefault(require("../px2em"));
describe('sugar.js.unit.px2em', () => {
    document.body.innerHTML = `
    <style>
      #testing {
        font-size: 10px;
      }
    </style>
    <div id="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should convert the passed px value to em correctly', () => {
        expect(px2em_1.default(20, $elm)).toBe(2);
    });
});
