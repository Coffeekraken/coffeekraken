"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodeIndex_1 = __importDefault(require("../nodeIndex"));
describe('sugar.js.dom.nodeIndex', () => {
    document.body.innerHTML = `
      
      <div></div>
      <div></div>
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should return 2 as node index for the #testing node', () => {
        expect(nodeIndex_1.default($elm)).toBe(2);
    });
});
