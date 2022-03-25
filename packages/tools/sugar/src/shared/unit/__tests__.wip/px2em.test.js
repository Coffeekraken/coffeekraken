import __px2em from "../px2em";
describe("sugar.js.unit.px2em", () => {
  document.body.innerHTML = `
    <style>
      #testing {
        font-size: 10px;
      }
    </style>
    <div id="testing"></div>
  `;
  const $elm = document.querySelector("#testing");
  it("Should convert the passed px value to em correctly", () => {
    expect(__px2em(20, $elm)).toBe(2);
  });
});
