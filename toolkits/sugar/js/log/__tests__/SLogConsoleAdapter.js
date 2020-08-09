"use strict";

module.exports = (__SLog, __SLogConsoleAdapter) => {
  describe('sugar.js.log.SLogConsoleAdapter', () => {
    var logger = new __SLog({
      overrideNativeConsole: false
    });
    var promises = [];
    promises.push(logger.log('Hello world'));
    promises.push(logger.info('Hello world'));
    promises.push(logger.warn('Hello world'));
    promises.push(logger.debug('Hello <green>world</green>'));
    promises.push(logger.error('Hello world <bold>error</bold>'));
    it('Should have resolved the 5 log promises correctly', done => {
      Promise.all(promises).then(c => {
        expect(c.length).toBe(5);
        done();
      });
    });
  });
};