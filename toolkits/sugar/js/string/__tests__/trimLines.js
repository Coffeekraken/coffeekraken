"use strict";

module.exports = __trimLines => {
  describe('sugar.js.string.trimLines', () => {
    it('Should trim the lines correctly', done => {
      var string = "Something\n      So cool\nSo cool\n                  a\nYes";
      expect(__trimLines(string, {
        leftPadding: 2
      })).toBe("  Something\n  So cool\n  So cool\n  a\n  Yes");
      done();
    });
  });
};