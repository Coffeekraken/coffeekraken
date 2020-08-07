"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqid;

var _uniqid = _interopRequireDefault(require("uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          uniqid
 * @namespace           js.string
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
function uniqid() {
  return (0, _uniqid.default)();
}

module.exports = exports.default;