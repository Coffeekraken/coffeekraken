"use strict";

module.exports = __debug => {
  describe('sugar.js.log.debug', () => {
    var promises = [];
    promises.push(__debug('Hello world'));
    it('Should have resolved the 1 debug promise correctly', done => {
      Promise.all(promises).then(c => {
        expect(c.length).toBe(1);
        done();
      });
    });
  });
};