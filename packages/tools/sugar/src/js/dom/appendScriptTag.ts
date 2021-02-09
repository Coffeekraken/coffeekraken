// @ts-nocheck

import scriptLoaded from './scriptLoaded';

/**
 * @name        appendScriptTag
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Append a script tag either to the head or the body
 *
 * @param    {String}    src    The script src to load
 * @return    {Promise}    A promise resolved with the script tag when it has fully loaded
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import appendScriptTag from '@coffeekraken/sugar/js/dom/appendScriptTag'
 * appendScriptTag('dist/js/app.js')
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function appendScriptTag(src, $parent = document.body) {
  const $script = document.createElement('script');
  $script.src = src;
  $parent.appendChild($script);
  return scriptLoaded($script);
}
export default appendScriptTag;
