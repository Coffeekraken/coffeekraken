import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __appendStylesheetLink = require("../appendStylesheetLink");
describe("sugar.js.dom.appendStylesheetLink", () => {
  __appendStylesheetLink("hello.css");
  it("Should append the style link correctly", () => {
    const $elm = document.querySelector("style");
    expect(typeof $elm).toBe("object");
  });
});
