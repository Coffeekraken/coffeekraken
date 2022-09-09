/**
 * @jest-environment jsdom
 */

import __stringToNode from '../stringToNode';

describe('sugar.js.html.strToNode', () => {
    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;

    const res = __stringToNode(html);

    it('Should have transform the dom element to a string correctly', () => {
        expect(typeof res).toBe('object');
        expect(res instanceof HTMLDivElement).toBe(true);
    });
});
