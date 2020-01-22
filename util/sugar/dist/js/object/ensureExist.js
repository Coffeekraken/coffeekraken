"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                        ensureExist
 * @namespace                   sugar.js.object
 * @type                        Function
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {String}            objectPath                    The object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @example           js
 * import ensureExist from '@coffeekraken/sugar/js/object/ensureExist';
 * ensureExist('my.cool.object', {});
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (objectPath, value = {}) => {
  const objectPathSplited = objectPath.split('.');
  let path = '';
  objectPathSplited.forEach((part, i) => {
    path += path === '' ? part : '.' + part;
    if (!eval(path)) i >= objectPathSplited.length - 1 ? eval(`${path} = ${JSON.stringify(value)};`) : eval(`${path} = {};`);
  });
};

exports.default = _default;
module.exports = exports.default;