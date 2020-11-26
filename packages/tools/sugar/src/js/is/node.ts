// @ts-nocheck
// @shared

/**
 * @name                                      isNode
 * @namespace           sugar.js.is
 * @type                                      Function
 * @stable
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import isNode from '@coffeekraken/sugar/js/is/node';
 * isNode(); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = () => {
  return (
    typeof process !== 'undefined' &&
    process.release &&
    process.release.name === 'node'
  );
};
