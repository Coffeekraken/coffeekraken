"use strict";

module.exports = __uid => {
  describe('sugar.js.object.uid', () => {
    it('Should encrypt the same object twice the same', done => {
      var obj = {
        param1: 'hello',
        param2: 'world coco'
      };

      var res1 = __uid(obj, 'somethingCool');

      var res2 = __uid(obj, 'somethingCool');

      expect(res1).toBe(res2);
      done();
    });
  });
};