import __getAnimationProperties from "../style/getAnimationProperties";
describe("sugar.js.dom.getAnimationProperties", () => {
  document.body.innerHTML = `
  <style>
    @keyframes coco {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    #testing {
      animation: coco 2s ease-in-out;
      animation-name: coco;
    }
  </style>
      <div id="testing">
      </div>
  `;
  const $elm = document.querySelector("#testing");
  const props = __getAnimationProperties($elm);
  it('Should find the "testing" element that is up in the dom tree', () => {
  });
});
