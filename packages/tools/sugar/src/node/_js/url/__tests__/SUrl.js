"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = __SUrl => {
  describe('sugar.js.url.SUrl', () => {
    it('Should build a simple url and parse it', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (done) {
        var url = new __SUrl('https://coffeekraken.io:9999/something/cool?item1=hello&item2=world#toMake');
        expect(url.protocol).toBe('https:');
        expect(url.hash).toBe('#toMake');
        expect(url.query).toEqual({
          item1: 'hello',
          item2: 'world'
        });
        expect(url.pathname).toBe('/something/cool');
        expect(url.port).toBe(9999);
        expect(url.hostname).toBe('coffeekraken.io');
        done();
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    it('Should nuild a complexe url with a schema and parse it', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (done) {
        var url = new __SUrl('https://coffeekraken.io:9999/something/cool/2?item1=hello&item2=world#toMake', {
          schema: '{param1:string}/{param2}/{?param3:number}'
        });
        expect(url.schema.params).toEqual({
          param1: {
            optional: false,
            raw: '{param1:string}',
            type: 'string',
            value: 'something'
          },
          param2: {
            optional: false,
            raw: '{param2}',
            type: null,
            value: 'cool'
          },
          param3: {
            optional: true,
            raw: '{?param3:number}',
            type: 'number',
            value: 2
          }
        });
        url.pathname = 'some/other';
        expect(url.schema.params).toEqual({
          param1: {
            optional: false,
            raw: '{param1:string}',
            type: 'string',
            value: 'some'
          },
          param2: {
            optional: false,
            raw: '{param2}',
            type: null,
            value: 'other'
          },
          param3: {
            optional: true,
            raw: '{?param3:number}',
            type: 'number',
            value: null
          }
        });
        url.pathname = '3/other/3';
        expect(url.schema.params).toEqual({
          param1: {
            error: {
              description: "This param \"param1\" has to be a \"string\" but he's a \"number\"...",
              type: "type",
              passed: "number",
              requested: "string"
            },
            optional: false,
            raw: '{param1:string}',
            type: 'string',
            value: 3
          },
          param2: {
            optional: false,
            raw: '{param2}',
            type: null,
            value: 'other'
          },
          param3: {
            optional: true,
            raw: '{?param3:number}',
            type: 'number',
            value: 3
          }
        });
        done();
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
};