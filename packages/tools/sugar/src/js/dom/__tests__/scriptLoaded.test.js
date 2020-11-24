"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scriptLoaded_1 = __importDefault(require("../scriptLoaded"));
describe('sugar.js.dom.scriptLoaded', () => {
    document.head.innerHTML = `
    <script type="text/javascript" src="src/data/tests/testing.js"></script>
  `;
    const $elm = document.head.querySelector('script');
    let isLoaded = false, isError = false;
    scriptLoaded_1.default($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    it('Should detect the script loading complete state', () => {
        $elm.onload();
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
