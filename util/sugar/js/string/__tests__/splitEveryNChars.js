"use strict";

module.exports = __splitEveryNChars => {
  describe('sugar.js.string.splitEveryNChars', () => {
    it('Should process the passed string correctly', done => {
      expect(__splitEveryNChars('aaaaaaaaaaaaaaaaaaaaa', 3)).toEqual(['aaa', 'aaa', 'aaa', 'aaa', 'aaa', 'aaa', 'aaa']);
      done();
    });
  });
};