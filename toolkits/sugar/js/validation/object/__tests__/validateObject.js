"use strict";

var __path = require('path');

module.exports = __validateValue => {
  describe('sugar.js.validation.value.validateValue', () => {
    it('Should validate the passed value correctly', () => {
      expect(__validateValue('hello', {
        type: 'Boolean',
        required: true
      })).toBe(true);
    });
  });
};