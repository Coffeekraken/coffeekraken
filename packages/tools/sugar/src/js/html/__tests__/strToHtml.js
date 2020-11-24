"use strict";
module.exports = (__strToHtml) => {
    describe('sugar.js.html.strToHtml', () => {
        const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
        const res = __strToHtml(html);
        it('Should have transform the dom element to a string correctly', () => {
            expect(typeof res).toBe('object');
            expect(res instanceof HTMLDivElement).toBe(true);
        });
    });
};
