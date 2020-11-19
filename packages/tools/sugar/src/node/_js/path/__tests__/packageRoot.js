"use strict";

module.exports = __packageRoot => {
  describe('sugar.js.path.packageRoot', () => {
    it('Should return the package root path correctly', () => {
      expect(__packageRoot()).not.toBe('');
    });
  });
};