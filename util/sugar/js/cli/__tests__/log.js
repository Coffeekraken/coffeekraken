"use strict";

module.exports = __log => {
  describe('sugar.js.cli.log', () => {
    it('Should log the passed strings correctly', done => {
      expect(__log('Hello world', 'debug')).toBe('debug: Hello world');
      done();
    });
  });
};