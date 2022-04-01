import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __imageLoaded from "../dom/load/imageLoaded";
function imagesLoadedAttribute() {
  document.addEventListener("load", (e) => {
    if (!e.target.tagName)
      return;
    if (e.target.tagName.toLowerCase() !== "img")
      return;
    if (e.target.hasAttribute("loaded"))
      return;
    e.target.setAttribute("loaded", true);
  }, true);
  [].forEach.call(document.querySelectorAll("img"), (img) => {
    __imageLoaded(img).then((img2) => {
      if (img2.hasAttribute("loaded"))
        return;
      img2.setAttribute("loaded", true);
    });
  });
}
var imagesLoadedAttribute_default = imagesLoadedAttribute;
export {
  imagesLoadedAttribute_default as default
};
