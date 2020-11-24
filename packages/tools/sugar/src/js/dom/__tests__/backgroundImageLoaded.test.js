"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const backgroundImageLoaded_1 = __importDefault(require("../backgroundImageLoaded"));
const dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
describe('sugar.js.dom.backgroundImageLoaded', () => {
    document.body.innerHTML = `
    <style>
      .testing {
        background-image: url('/test.jpg');
      }
    </style>
    <div id="testing" class="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    let isLoaded = false, isError = false;
    const promise = backgroundImageLoaded_1.default($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    dispatchEvent_1.default(promise.__$img, 'load');
    it('Should detect the background image loading complete state', () => {
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
