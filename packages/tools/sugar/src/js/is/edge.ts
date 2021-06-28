// @ts-nocheck

/**
 * @name        isEdge
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * Detect if is edge
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is edge, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isEdge from '@coffeekraken/sugar/js/is/edge'
 * if (isEdge()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isEdge(ua: string = navigator.userAgent): boolean {
  return ua.indexOf('Edg/') > -1;
}
export default isEdge;
