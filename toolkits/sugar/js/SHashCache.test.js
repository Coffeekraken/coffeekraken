"use strict";

var _SHashCache = _interopRequireDefault(require("../SHashCache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cache = new _SHashCache.default('sugar-js-cache-SHashCache', {
  adapter: 'fs'
});
var myObject = {
  something: 'cool',
  other: new Date()
};
describe('sugar.js.cache.SHashCache', () => {
  test('Set an item in the cache', done => {
    _asyncToGenerator(function* () {
      yield cache.set(myObject, {
        hello: 'world'
      });
      done();
    })();
  });
  test('Get an item from the cache', done => {
    _asyncToGenerator(function* () {
      var value = yield cache.get(myObject);
      expect(value).toEqual({
        hello: 'world'
      });
      done();
    })();
  });
});