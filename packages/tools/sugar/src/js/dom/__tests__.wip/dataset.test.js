import __dataset from "../data/dataset";
describe("sugar.js.dom.dataset", () => {
  document.body.innerHTML = `
      <div id="testing" data-coco="hello"></div>
      <div id="testing1" data-plop="{hello:'coco'}"></div>
      
  `;
  const $testing = document.querySelector("#testing");
  const $testing1 = document.querySelector("#testing1");
  __dataset($testing1, "json", {
    hello: "world"
  });
  it("Should get correctly the data-coco value from the attributes", () => {
    expect(__dataset($testing, "coco")).toBe("hello");
  });
  it('Should get correctly the data "json" value from the dataset stack', () => {
    expect(__dataset($testing1, "json")).toEqual({
      hello: "world"
    });
  });
  it('Should get correctly the data "plop" value from the attributes', () => {
    expect(__dataset($testing1, "plop")).toEqual({
      hello: "coco"
    });
  });
});
