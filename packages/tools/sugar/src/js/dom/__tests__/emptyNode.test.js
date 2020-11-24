"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emptyNode_1 = __importDefault(require("../emptyNode"));
describe('sugar.js.dom.emptyNode', () => {
    document.body.innerHTML = `
      <div id="testing">
        <div class="coco">
        </div>
        <div id="source"></div>
      </div>
  `;
    const $elm = document.querySelector('#testing');
    emptyNode_1.default($elm);
    it('Should have empty the node correctly', () => {
        expect($elm.childNodes.length).toBe(0);
    });
});
