"use strict";

module.exports = __striptags => {
  describe('sugar.js.html.striptags', () => {
    const html = `<div><bold>Hello world</bold><h1>How are you?</h1></div>`;

    const res = __striptags(html, '<bold>');

    it('Should have replace the tags correctly', () => {
      expect(res).toBe('<bold>Hello world</bold>How are you?');
    });
  });
};