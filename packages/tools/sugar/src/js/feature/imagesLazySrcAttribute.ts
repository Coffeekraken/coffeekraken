// @ts-nocheck

import whenInViewport from '../dom/whenInViewport';
import querySelectorLive from '../dom/querySelectorLive';
import deepMerge from '../object/deepMerge';

/**
 * @name 		imagesLazySrcAttribute
 * @namespace           sugar.js.feature
 * @type      Feature
 * @stable
 *
 * Add support for the `lazy-src` attribute on `img` elements.
 * The video `src` attribute will be populated when the `img` element enter the viewport
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example       js
 * import imagesLazySrcAttribute from '@coffeekraken/sugar/js/feature/imagesLazySrcAttribute';
 * imagesLazySrcAttribute();
 *
 * @example    html
 * <img lazy-src="my-cool-image.jpg" />
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function imagesLazySrcAttribute(settings = {}) {
  settings = deepMerge(
    {
      offset: 50
    },
    settings
  );
  querySelectorLive('img[lazy-src]:not([is])', ($imgElm) => {
    whenInViewport($imgElm, settings.offset).then(() => {
      $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
    });
  });
}
export default imagesLazySrcAttribute;
