"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = __request => {
  if (process.env.GITHUB_WORKFLOW !== undefined) {
    test('Bypass these tests cause we are in Github actions env', done => {
      done();
    });
    return;
  }

  test('Making simple ajax request', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (done) {
      try {
        var response = yield __request({
          url: 'http://dummy.restapiexample.com/api/v1/employees',
          method: 'get'
        });
        expect(response.status).toBe(200);
        done();
      } catch (e) {
        done(e);
      }
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  test('Making an ajax request with multiple send count', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (done) {
      try {
        var response = yield __request({
          url: 'http://dummy.restapiexample.com/api/v1/employees',
          method: 'get',
          sendCount: 2
        });
        expect(response.length).toBe(2);
        done();
      } catch (e) {
        done(e);
      }
    });

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};