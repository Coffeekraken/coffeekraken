"use strict";

module.exports = __toQueryString => {
  describe('sugar.js.object.toQueryString', () => {
    it('Should transformt the object into a correctly formatted query string', done => {
      var obj = {
        param1: 'hello',
        param2: 'world coco'
      };
      expect(__toQueryString(obj)).toBe('?param1=hello&param2=world%20coco');
      done();
    });
  });
};