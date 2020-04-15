"use strict";

var _imageLoaded = _interopRequireDefault(require("../dom/imageLoaded"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 		imagesLoadedAttribute
 * @namespace       sugar.js.feature
 * @type      Feature
 *
 * Add on every images the attribute "loaded" when it has been fully loaded. This is useful
 * for styling purposes and for others thinks as well.
 *
 * @example 	js
 * import '@coffeekraken/sugar/js/feature/imagesLoadedAttribute'
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// TODO tests
document.addEventListener("load", e => {
  if (!e.target.tagName) return;
  if (e.target.tagName.toLowerCase() !== "img") return;
  if (e.target.hasAttribute("loaded")) return;
  e.target.setAttribute("loaded", true);
}, true);
[].forEach.call(document.querySelectorAll("img"), img => {
  (0, _imageLoaded.default)(img).then(img => {
    if (img.hasAttribute("loaded")) return;
    img.setAttribute("loaded", true);
  });
});