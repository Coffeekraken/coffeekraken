"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("../next"));
describe('sugar.js.dom.next', () => {
    document.body.innerHTML = `
      <div id="testing"></div>
      <div id="next1"></div>
      <div id="next2"></div>
  `;
    const $elm = document.querySelector('#testing');
    const $next2 = document.querySelector('#next2');
    const $finded = next_1.default($elm, '#next2');
    it('Should find the $next2 element from the $testing one', () => {
        expect($finded).toEqual($next2);
    });
});
