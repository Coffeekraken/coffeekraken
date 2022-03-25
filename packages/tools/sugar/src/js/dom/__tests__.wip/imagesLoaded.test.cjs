const __imagesLoaded = require("../imagesLoaded");
const __dispatchEvent = require("../dispatchEvent");
describe("sugar.js.dom.imagesLoaded", () => {
  document.head.innerHTML = `
    <img id="image1" src="src/data/tests/testing.jpg" />
    <img id="image2" src="src/data/tests/testing.jpg" />
    <img id="image3" src="src/data/tests/testing.jpg" />
  `;
  const $img1 = document.head.querySelector("#image1");
  const $img2 = document.head.querySelector("#image2");
  const $img3 = document.head.querySelector("#image3");
  let isLoaded = false, isError = false, imgsCount = 0;
  __imagesLoaded([$img1, $img2, $img3]).on("img.loaded", (_$img) => {
    imgsCount++;
  }).then((arrayImages) => {
    isLoaded = true;
  }).catch((e) => {
    isError = true;
  });
  __dispatchEvent($img1, "load");
  __dispatchEvent($img2, "load");
  __dispatchEvent($img3, "load");
  it("Should detect when all the images are loaded correctly", () => {
    setTimeout(() => {
      expect(isLoaded).toBe(true);
      expect(isError).toBe(false);
      expect(imgsCount).toBe(3);
    });
  });
});
