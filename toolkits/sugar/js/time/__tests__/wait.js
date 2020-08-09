"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = __wait => {
  describe('sugar.js.time.wait', () => {
    it('Should wait 200ms before resolving the test', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (done) {
        yield __wait(200);
        done();
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};