"use strict";

module.exports = __splitEvery => {
  describe('sugar.js.string.splitEvery', () => {
    it('Should process the passed string correctly', done => {
      expect(__splitEvery('aaaaaaaaaaaaaaaaaaaaa', 3, true)).toEqual(['aaa', 'aaa', 'aaa', 'aaa', 'aaa', 'aaa', 'aaa']);
      done();
    });
  });
};