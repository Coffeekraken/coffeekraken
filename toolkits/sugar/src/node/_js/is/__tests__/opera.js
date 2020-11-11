"use strict";

var _jestUseragentMock = require("jest-useragent-mock");

module.exports = __testFn => {
  describe('sugar.js.is.opera', () => {
    afterEach(() => {
      (0, _jestUseragentMock.clear)();
    });
    (0, _jestUseragentMock.mockUserAgent)('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36 OPR/67.0.3575.137');
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn()).toBe(true);
    });
  });
};