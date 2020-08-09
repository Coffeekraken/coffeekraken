"use strict";

module.exports = __replaceTags => {
  describe('sugar.js.html.replaceTags', () => {
    var html = "\n  <div>\n    <bold>Hello world</bold>\n    <h1>\n      How are you?\n    </h1>\n  </div>\n";

    var res = __replaceTags(html, {
      bold: (tag, content) => "<yop>".concat(content, "</yop>"),
      h1: (tag, content) => content
    });

    it('Should have replace the tags correctly', () => {
      expect(res.replace(/\s/g, '')).toBe("\n<div>\n<yop>Hello world</yop>\n\n  How are you?\n\n</div>\n".replace(/\s/g, ''));
    });
  });
};