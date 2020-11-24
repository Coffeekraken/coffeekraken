"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStyleProperty_1 = __importDefault(require("../getStyleProperty"));
describe('sugar.js.dom.getStyleProperty', () => {
    document.body.innerHTML = `
      <style>
          #testing {
            content: 'hello world';
            animation: coco 2s ease-in-out 3s;
          }
      </style>
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    it('Should get the "content" css property correctly', () => {
        expect(getStyleProperty_1.default($elm, 'content')).toBe('hello world');
    });
    it('Should get the "animation" css property correctly', () => {
        expect(getStyleProperty_1.default($elm, 'animation')).toBe('coco 2s ease-in-out 3s');
    });
});
