"use strict";

module.exports = __strToHtml => {
  describe('sugar.js.html.strToHtml', () => {
    var html = "\n  <div>\n    <bold>Hello world</bold>\n    <h1>\n      How are you?\n    </h1>\n  </div>\n";

    var res = __strToHtml(html);

    it('Should have transform the dom element to a string correctly', () => {
      expect(typeof res).toBe('object');
      expect(res instanceof HTMLDivElement).toBe(true);
    });
  });
};