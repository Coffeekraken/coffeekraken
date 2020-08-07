"use strict";

module.exports = __trimLines => {
  describe('sugar.js.string.trimLines', () => {
    it('Should trim the lines correctly', done => {
      const string = `Something
      So cool
So cool
                  a
Yes`;
      expect(__trimLines(string, {
        leftPadding: 2
      })).toBe(`  Something
  So cool
  So cool
  a
  Yes`);
      done();
    });
  });
};