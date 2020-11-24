"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
describe('sugar.js.dom.dispatchEvent', () => {
    document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    let isDetected = false;
    $elm.addEventListener('coco', e => {
        if (!e.detail.custom)
            return;
        isDetected = true;
    });
    dispatchEvent_1.default($elm, 'coco', {
        custom: true
    });
    it('Should detect the dispatched custom event with custom data attached', () => {
        expect(isDetected).toBe(true);
    });
});
