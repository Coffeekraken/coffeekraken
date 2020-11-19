"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncForEach;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @name                              asyncForEach
 * @namespace           sugar.js.array
 * @type                              Function
 *
 * Allow to make some async foreach on your arrays
 *
 * @param         {Array}             array             The array to loop on
 * @param         {Function}          asyncFn           The async function to call on each items
 *
 * @example         js
 * import asyncForEach from '@coffeekraken/sugar/js/array/asyncForEach';
 * const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
 * asyncForEach([0,1,2,3], async (item) => {
 *    await waitWor(50);
 *    console.log(item);
 * });
 * // 0
 * // 1
 * // 2
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function asyncForEach(_x, _x2) {
  return _asyncForEach.apply(this, arguments);
}

function _asyncForEach() {
  _asyncForEach = _asyncToGenerator(function* (array, asyncFn) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        for (var index = 0; index < array.length; index++) {
          yield asyncFn(array[index], index, array);
        }

        resolve();
      });

      return function (_x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }());
  });
  return _asyncForEach.apply(this, arguments);
}

module.exports = exports.default;