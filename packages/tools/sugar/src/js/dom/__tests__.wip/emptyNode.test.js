import __emptyNode from "../manipulate/emptyNode";
describe("sugar.js.dom.emptyNode", () => {
  document.body.innerHTML = `
      <div id="testing">
        <div class="coco">
        </div>
        <div id="source"></div>
      </div>
  `;
  const $elm = document.querySelector("#testing");
  __emptyNode($elm);
  it("Should have empty the node correctly", () => {
    expect($elm.childNodes.length).toBe(0);
  });
});
