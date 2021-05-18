// @ts-nocheck

import __imageLoaded from '../dom/load/imageLoaded';
import __deepMerge from '../../shared/object/deepMerge';

/**
 * @name 		imagesLoadedAttribute
 * @namespace            js.feature
 * @type      Feature
 * @stable
 *
 * Add on every images the attribute "loaded" when it has been fully loaded. This is useful
 * for styling purposes and for others thinks as well.
 *
 * @param     {Object}        [settings={}]       An object of settings to configure your feature
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example 	js
 * import imagesLoadedAttribute from '@coffeekraken/sugar/js/feature/imagesLoadedAttribute';
 * imagesLoadedAttribute();
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function imagesLoadedAttribute(settings = {}) {
  settings = __deepMerge({}, settings);
  document.addEventListener(
    'load',
    (e) => {
      if (!e.target.tagName) return;
      if (e.target.tagName.toLowerCase() !== 'img') return;
      if (e.target.hasAttribute('loaded')) return;
      e.target.setAttribute('loaded', true);
    },
    true
  );
  [].forEach.call(document.querySelectorAll('img'), (img) => {
    __imageLoaded(img).then((img) => {
      if (img.hasAttribute('loaded')) return;
      img.setAttribute('loaded', true);
    });
  });
}
export default imagesLoadedAttribute;
