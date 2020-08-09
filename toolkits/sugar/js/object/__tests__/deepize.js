"use strict";

module.exports = __deepize => {
  describe('sugar.js.object.deepize', () => {
    it('Should deepize the passed objects correctly', done => {
      var obj1 = {
        'hello.world': 'coco',
        'something.else': true
      };

      var res = __deepize(obj1);

      expect(res).toEqual({
        hello: {
          world: 'coco'
        },
        something: {
          else: true
        }
      });
      done();
    });
  });
};