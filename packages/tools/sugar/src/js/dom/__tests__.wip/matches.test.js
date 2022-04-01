import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __matches from "../query/matches";
describe("sugar.js.dom.matches", () => {
  document.body.innerHTML = `
      <div id="testing" class="hello-world coco">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  it("Should return true on the match testing", () => {
    expect(__matches($elm, ".hello-world, .coco")).toBe(true);
  });
  it("Should return false on the match testing", () => {
    expect(__matches($elm, ".hello-wold, .coco")).toBe(true);
  });
});
