"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addEventListener_1 = __importDefault(require("../addEventListener"));
const dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
describe('sugar.js.dom.addEventListener', () => {
    let isCallbackCalled = false, isThenCalled = false, hasBeenReleased = false, hasBeenCanceled = false;
    let clickCount = 0;
    document.body.innerHTML = `
    <div id="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    const listener = addEventListener_1.default($elm, 'click', (event) => {
        isCallbackCalled = true;
    })
        .on('click', (event) => {
        isThenCalled = true;
        clickCount++;
    })
        .finally((event) => {
        hasBeenReleased = true;
    })
        .on('cancel', (event) => {
        hasBeenCanceled = true;
    });
    dispatchEvent_1.default($elm, 'click');
    // release the listener
    listener.cancel();
    setTimeout(() => {
        dispatchEvent_1.default($elm, 'click');
    });
    it('Should have register the listener correctly and called as expected', (done) => {
        expect(isCallbackCalled).toBe(true);
        expect(isThenCalled).toBe(true);
        expect(clickCount).toBe(1);
        expect(hasBeenCanceled).toBe(true);
        done();
    });
});
