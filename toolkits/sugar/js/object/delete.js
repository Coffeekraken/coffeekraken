"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = del;

var _set = _interopRequireDefault(require("./set"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      delete
 * @namespace           js.object
 * @type                      Function
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @example         js
 * import delete from '@coffeekraken/sugar/js/object/delete';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * delete(myObject, 'plop');
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function del(object, dotPath) {
  var parentDotPath = dotPath.split('.').slice(0, -1).join('.');
  if (!dotPath || dotPath === '' || dotPath === '.') return object;
  dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
  dotPath = dotPath.replace(/^\./, '');
  var a = dotPath.split('.');
  var o = object;

  while (a.length) {
    var n = a.shift();

    if (a.length < 1) {
      if (Array.isArray(o)) {
        (function () {
          var valueToDelete = o[n];
          o = o.filter(v => {
            return v !== valueToDelete;
          });
        })();
      } else {
        delete o[n];
      }

      (0, _set.default)(object, parentDotPath, o);
    } else {
      o = o[n];
    }
  }

  return object;
}

module.exports = exports.default;