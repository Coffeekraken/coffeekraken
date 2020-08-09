"use strict";

module.exports = __extractValues => {
  describe('sugar.js.object.extractValues', () => {
    it('Should extract correctly the values from an array ob objects', done => {
      var array = [{
        hello: 'world',
        plop: 'wijwoeijfewf'
      }, {
        hello: 'something',
        plop: 'wijfjjfjfjf'
      }, {
        plop: 'something else'
      }];
      expect(__extractValues(array, 'hello')).toEqual(['world', 'something']);
      done();
    });
  });
};