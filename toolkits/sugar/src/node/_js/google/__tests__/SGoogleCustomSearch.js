"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = __SGoogleCustomSearch => {
  test('Make a simple google search', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (done) {
      var google = new __SGoogleCustomSearch('AIzaSyDzFfEzhmYXRTlONUCtMWQ88uHJhsbtXY4', '000247055370126278051:xqxglvx8w5x');
      var response = yield google.search('sugar');
      expect(response.status).toBe(200);
      expect(response.data.kind).toBe('customsearch#search');
      done();
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};