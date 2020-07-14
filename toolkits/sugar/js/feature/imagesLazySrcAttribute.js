"use strict";

var _whenInViewport = _interopRequireDefault(require("../dom/whenInViewport"));

var _querySelectorLive = _interopRequireDefault(require("../dom/querySelectorLive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO tests

/**
 * @name 		imagesLazySrcAttribute
 * @namespace           js.feature
 * @type      Feature
 *
 * Add support for the `lazy-src` attribute on `img` elements.
 * The video `src` attribute will be populated when the `img` element enter the viewport
 *
 * @example    html
 * <img lazy-src="my-cool-image.jpg" />
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
(0, _querySelectorLive.default)('img[lazy-src]:not([is])', $imgElm => {
  (0, _whenInViewport.default)($imgElm).then(() => {
    $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
  });
});