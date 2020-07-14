"use strict";

module.exports = __includes => {
  describe('sugar.js.string.includes', () => {
    it('Should process the passed string correctly', done => {
      expect(__includes("something wfijweoifjw fwoj foijwef hello ifwjefoiw world wifjweoif", 'something,world,coco')).toEqual(['something', 'world']);
      done();
    });
  });
};