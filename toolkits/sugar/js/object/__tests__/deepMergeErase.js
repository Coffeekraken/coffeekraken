"use strict";

module.exports = (__deepMerge, __deepMergeErase) => {
  describe('sugar.js.object.deepMergeErase', () => {
    it('Should merge the passed objects correctly', done => {
      const obj1 = {
        hello: {
          world: 'hello world'
        },
        plop: {}
      };
      const obj2 = {
        hello: __deepMergeErase({
          coco: 'coco'
        }),
        yes: true
      };

      const result = __deepMerge(obj1, obj2);

      expect(result).toEqual({
        hello: {
          coco: 'coco'
        },
        plop: {},
        yes: true
      });
      done();
    });
  });
};