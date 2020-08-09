"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = __sleep => {
  describe('sugar.js.function.sleep', () => {
    var start, end;

    _asyncToGenerator(function* () {
      start = Date.now();
      yield __sleep(200);
      end = Date.now();
    })();

    it('Sould a difference between the start and the end time greater that 200', done => {
      setTimeout(() => {
        expect(end - start).toBeGreaterThan(195);
        done();
      }, 250);
    });
  });
};