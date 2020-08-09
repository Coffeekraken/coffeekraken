"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = (__SConfig, __SConfigLsAdapter) => {
  var config = new __SConfig('myCoolConfig', {
    adapters: [new __SConfigLsAdapter({
      name: 'something',
      defaultConfig: {
        adapter: 'ls',
        joy: {
          hello: 'world'
        }
      }
    })],
    allowNew: true
  });
  describe('sugar.js.config.adapters.SConfigLsAdapter', () => {
    it('Should load, set, save and get correctly the config from the localStorage', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (done) {
        config.set('something.cool', 'Hello world');
        config.load();
        expect(config.get('something')).toEqual({
          cool: 'Hello world'
        });
        done();
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};