"use strict";

module.exports = __get => {
  describe('sugar.js.object.get', () => {
    it('Should get the object property correctly', done => {
      var obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: {
          array: [0, 1, 2]
        }
      };

      var val1 = __get(obj1, 'hello.world');

      var val2 = __get(obj1, 'plop.array.2');

      expect(val1).toBe('hello world');
      expect(val2).toBe(2);
      done();
    });
  });
};