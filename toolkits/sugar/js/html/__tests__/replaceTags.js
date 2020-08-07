"use strict";

module.exports = __replaceTags => {
  describe('sugar.js.html.replaceTags', () => {
    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;

    const res = __replaceTags(html, {
      bold: (tag, content) => `<yop>${content}</yop>`,
      h1: (tag, content) => content
    });

    it('Should have replace the tags correctly', () => {
      expect(res.replace(/\s/g, '')).toBe(`
<div>
<yop>Hello world</yop>

  How are you?

</div>
`.replace(/\s/g, ''));
    });
  });
};