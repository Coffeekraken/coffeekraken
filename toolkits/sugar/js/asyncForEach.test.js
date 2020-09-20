"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __asyncForEach = require('../asyncForEach');

var waitFor = ms => new Promise(r => setTimeout(r, ms));

test('sugar.js.array.asyncForEach: Simple async foreach execution', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (done) {
    var i = 0;
    yield __asyncForEach([1, 2, 3, 4], /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (idx) {
        yield waitFor(200);
        i += idx;
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    expect(i).toBe(10);
    done();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());