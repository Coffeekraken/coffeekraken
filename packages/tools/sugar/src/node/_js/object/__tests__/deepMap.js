"use strict";

module.exports = __deepMap => {
  describe('sugar.js.object.deepMap', () => {
    it('Should map the passed objects correctly', done => {
      var obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: {
          world: 'Yop'
        }
      };

      var res = __deepMap(obj1, (value, prop, fullPath) => {
        return "~ ".concat(value);
      });

      expect(res).toEqual({
        hello: {
          world: '~ hello world'
        },
        plop: {
          world: '~ Yop'
        }
      });
      done();
    });
  });
};