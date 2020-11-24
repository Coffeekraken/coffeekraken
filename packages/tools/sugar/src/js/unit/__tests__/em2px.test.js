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
        expect(em2px_1.default(2, $elm)).toBe(20);
    });
});
