"use strict";

module.exports = __unique => {
  describe('sugar.js.array.unique', () => {
    it('Should unique an array correctly', done => {
      const baseArray = ['a', 'b', 'c', 'a'];

      const myArray = __unique(baseArray);

      expect(myArray).toEqual(['a', 'b', 'c']);
      const obj = {
        hello: 'world'
      };
      const objBaseArray = ['a', 'b', obj, 'c', obj, obj, obj];
      expect(__unique(objBaseArray)).toEqual(['a', 'b', obj, 'c']);
      done();
    });
  });
};