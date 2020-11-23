/**
 * @name                                      isJs
 * @namespace           sugar.js.is
 * @type                                      Function
 * @stable
 *
 * Check if the current script is running under javascript runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import isJs from '@coffeekraken/sugar/js/is/js';
 * isJs(); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default () => {
  return typeof window !== 'undefined';
};
