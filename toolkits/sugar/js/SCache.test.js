"use strict";

var _SCache = _interopRequireDefault(require("../SCache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cache = new _SCache.default('sugar-js-cache-SCache', {
  adapter: 'ls'
});
test('sugar.js.cache.SCache: Set an item in the cache', done => {
  _asyncToGenerator(function* () {
    yield cache.set('myCoolItem', {
      hello: 'world'
    });
    done();
  })();
});
test('sugar.js.cache.SCache: Get an item in the cache', done => {
  _asyncToGenerator(function* () {
    var item = yield cache.get('myCoolItem');
    expect(item).toEqual({
      hello: 'world'
    });
    done();
  })();
});
test('sugar.js.cache.SCache: Delete an item in the cache', done => {
  _asyncToGenerator(function* () {
    yield cache.delete('myCoolItem');
    var item = yield cache.get('myCoolItem');
    expect(item).toBe(null);
    done();
  })();
});