import whenInViewport from '../dom/whenInViewport';
import querySelectorLive from '../dom/querySelectorLive';

/**
 * @name 		videoLazySrcAttribute
 * @namespace           sugar.js.feature
 * @type      Feature
 * @stable
 *
 * Add support for the `lazy-src` attribute on `video` elements.
 * The video `src` attribute will be populated when the `video` element enter the viewport
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example     js
 * import videoLazySrcAttribute from '@coffeekraken/sugar/js/feature/videoLazySrcAttribute';
 * videoLazySrcAttribute();
 *
 * @example    html
 * <video lazy-src="my-cool-video.mp4"></video>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function videoLazySrcAttribute(settings = {}) {
  settings = {
    offset: 50,
    ...settings
  };
  querySelectorLive('video[lazy-src]:not([is])', ($videoElm) => {
    whenInViewport($videoElm, settings.offset).then(() => {
      $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
    });
  });
}
