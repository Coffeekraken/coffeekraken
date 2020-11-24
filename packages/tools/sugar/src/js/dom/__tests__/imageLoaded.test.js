"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageLoaded_1 = __importDefault(require("../imageLoaded"));
const dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
describe('sugar.js.dom.imageLoaded', () => {
    document.head.innerHTML = `
    <img src="src/data/tests/testing.jpg" />
  `;
    const $elm = document.head.querySelector('img');
    let isLoaded = false, isError = false;
    imageLoaded_1.default($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    dispatchEvent_1.default($elm, 'load');
    it('Should detect the image loading complete state', () => {
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
