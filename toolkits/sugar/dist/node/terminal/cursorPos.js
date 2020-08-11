"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __terminalKit = require('terminal-kit').terminal; // TODO tests

/**
 * @name                                      cursorPos
 * @namespace           node.terminal
 * @type                                      Function
 *
 * Return the terminal cursor position in {x,y} format.
 *
 * @return              {Promise}                         A promise resolved once the position has been getted
 *
 * @example             js
 * const cursorPos = require('@coffeekraken/sugar/node/terminal/cursorPos');
 * await cursorPos(); // => { x: 10, y: 20 }
 *
 * @see       https://www.npmjs.com/package/terminal-kit
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function cursorPos() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      __terminalKit.once('terminal', (name, data) => {
        resolve(data);
      });

      try {
        yield __terminalKit.getCursorLocation();
      } catch (e) {}
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};