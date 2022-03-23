import __dispatchEvent from "../event/dispatchEvent";
describe("sugar.js.dom.dispatchEvent", () => {
  document.body.innerHTML = `
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  let isDetected = false;
  $elm.addEventListener("coco", (e) => {
    if (!e.detail.custom)
      return;
    isDetected = true;
  });
  __dispatchEvent($elm, "coco", {
    custom: true
  });
  it("Should detect the dispatched custom event with custom data attached", () => {
    expect(isDetected).toBe(true);
  });
});
