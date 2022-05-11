import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __closest from "../query/closest";
describe("sugar.js.dom.closest", () => {
  document.body.innerHTML = `
      <div id="testing">
        <div class="coco">
          <div id="source"></div>
        </div>
      </div>
  `;
  const $elm = document.querySelector("#source");
  it('Should find the "testing" element that is up in the dom tree', () => {
    const $testing = __closest($elm, "#testing");
    expect($testing.id).toBe("testing");
  });
});
