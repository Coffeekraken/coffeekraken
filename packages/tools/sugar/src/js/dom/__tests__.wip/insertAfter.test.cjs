import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __insertAfter = require("../insertAfter");
describe("sugar.js.dom.insertAfter", () => {
  document.body.innerHTML = `
    <div id="testing"></div>
  `;
  const $elm = document.querySelector("#testing");
  const $add = document.createElement("a");
  __insertAfter($add, $elm);
  it("Should append the new element tag correctly", () => {
    expect($elm.nextSibling).toEqual($add);
  });
});
