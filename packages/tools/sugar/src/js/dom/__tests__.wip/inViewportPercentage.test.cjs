const __inViewportPercentage = require("../inViewportPercentage");
describe("sugar.js.dom.inViewportPercentage", () => {
  document.body.innerHTML = `
    <style>
      #testing {
        display: block;
        width: 100px; height: 100px;
        background: red;
        position: absolute;
        top:0; left: -50px;
      }
    </style>
    <div id="testing"></div>
  `;
  const $elm = document.querySelector("#testing");
  $elm.getBoundingClientRect = jest.fn(() => ({
    x: -50,
    y: 0,
    width: 100,
    height: 100,
    top: 0,
    right: 50,
    bottom: 100,
    left: -50
  }));
  const percentage = __inViewportPercentage($elm);
  it("Should get the percentage in the viewport correctly", () => {
    expect(percentage).toBe(50);
  });
});
