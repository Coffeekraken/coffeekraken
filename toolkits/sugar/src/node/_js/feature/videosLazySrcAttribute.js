"use strict";

var _whenInViewport = _interopRequireDefault(require("../dom/whenInViewport"));

var _querySelectorLive = _interopRequireDefault(require("../dom/querySelectorLive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 		videoLazySrcAttribute
 * @namespace           sugar.js.feature
 * @type      Feature
 *
 * Add support for the `lazy-src` attribute on `video` elements.
 * The video `src` attribute will be populated when the `video` element enter the viewport
 *
 * @example    html
 * <video lazy-src="my-cool-video.mp4"></video>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// TODO tests
(0, _querySelectorLive.default)('video[lazy-src]:not([is])', $videoElm => {
  (0, _whenInViewport.default)($videoElm).then(() => {
    $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
  });
});