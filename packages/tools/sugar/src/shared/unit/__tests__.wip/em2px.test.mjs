import __em2px from "../em2px";
describe("sugar.js.unit.em2px", () => {
  document.body.innerHTML = `
    <style>
      #testing {
        font-size: 10px;
      }
    </style>
    <div id="testing"></div>
  `;
  const $elm = document.querySelector("#testing");
  it("Should convert the passed em value to px correctly", () => {
    expect(__em2px(2, $elm)).toBe(20);
  });
});
