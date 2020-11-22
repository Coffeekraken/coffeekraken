import __uniqid from 'uniqid';
/**
 * @name          uniqid
 * @namespace           sugar.js.string
 * @type          Function
 *
 * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
 *
 * @return          {String}                A 8 bytes uniqid string
 *
 * @example       js
 * import uniqid from '@coffeekraken/sugar/js/string/uniqid';
 * console.log(uniqid()); // => 4n5pxq24
 *
 * @see       https://www.npmjs.com/package/uniqid
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function uniqid() {
  return __uniqid();
}
