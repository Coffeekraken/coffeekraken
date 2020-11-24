"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detectInOutDirection_1 = __importDefault(require("../detectInOutDirection"));
const dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
describe('sugar.js.dom.detectInOutDirection', () => {
    document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    let isInTriggered = false, isOutTriggered = false, isThenTriggered = false;
    detectInOutDirection_1.default($elm)
        .on('in', (direction) => {
        isInTriggered = true;
    })
        .on('out', (direction) => {
        isOutTriggered = true;
    })
        .then((value) => {
        isThenTriggered = true;
    });
    dispatchEvent_1.default($elm, 'mouseenter');
    dispatchEvent_1.default($elm, 'mouseleave');
    it('Should have trigger the "in" stack correctly', () => {
        setTimeout(() => {
            expect(isInTriggered).toBe(true);
        });
    });
    it('Should have trigger the "out" stack correctly', () => {
        setTimeout(() => {
            expect(isOutTriggered).toBe(true);
        });
    });
    it('Should have trigger the "then" stack correctly', () => {
        setTimeout(() => {
            expect(isThenTriggered).toBe(true);
        });
    });
});
