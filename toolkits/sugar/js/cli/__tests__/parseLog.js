"use strict";

module.exports = __parseLog => {
  describe('sugar.js.cli.parseLog', () => {
    it('Should parse the passed log correctly', done => {
      expect(__parseLog('debug: Hello world')).toEqual({
        level: 'debug',
        value: 'Hello world'
      });
      done();
    });
  });
};