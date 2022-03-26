var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_addEventListener = __toESM(require("../event/addEventListener"), 1);
var import_dispatchEvent = __toESM(require("../event/dispatchEvent"), 1);
describe("sugar.js.dom.addEventListener", () => {
  let isCallbackCalled = false, isThenCalled = false, hasBeenReleased = false, hasBeenCanceled = false;
  let clickCount = 0;
  document.body.innerHTML = `
    <div id="testing"></div>
  `;
  const $elm = document.querySelector("#testing");
  const listener = (0, import_addEventListener.default)($elm, "click", (event) => {
    isCallbackCalled = true;
  }).on("click", (event) => {
    isThenCalled = true;
    clickCount++;
  }).finally((event) => {
    hasBeenReleased = true;
  }).on("cancel", (event) => {
    hasBeenCanceled = true;
  });
  (0, import_dispatchEvent.default)($elm, "click");
  listener.cancel();
  setTimeout(() => {
    (0, import_dispatchEvent.default)($elm, "click");
  });
  it("Should have register the listener correctly and called as expected", (done) => {
    expect(isCallbackCalled).toBe(true);
    expect(isThenCalled).toBe(true);
    expect(clickCount).toBe(1);
    expect(hasBeenCanceled).toBe(true);
    done();
  });
});
