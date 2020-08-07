"use strict";

module.exports = __camelize => {
  describe('sugar.js.string.camelize', () => {
    it('Should process the passed string correctly', done => {
      expect(__camelize('hello world')).toBe('helloWorld');
      done();
    });
  });
};