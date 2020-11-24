"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observeMutations_1 = __importDefault(require("../observeMutations"));
describe('sugar.js.dom.observeMutations', () => {
    document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    let mutationsCount = 0;
    observeMutations_1.default($elm).then((mutation) => {
        if (mutation.attributeName === 'plop' ||
            mutation.attributeName === 'hello') {
            mutationsCount++;
        }
    });
    $elm.setAttribute('plop', 'coco');
    $elm.setAttribute('hello', 'world');
    it('Should have detect all the mutations done on the $elm', () => {
        setTimeout(() => {
            expect(mutationsCount).toBe(2);
        });
    });
});
