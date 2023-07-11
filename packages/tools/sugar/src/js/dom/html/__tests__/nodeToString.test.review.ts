/**
 * @jest-environment jsdom
 */

// @ts-nocheck

import __nodeToString from '../nodeToString.js';

describe('sugar.js.html.nodeToString', () => {
    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
    document.body.innerHTML = html;

    const $elm = document.querySelector('bold');

    const res = __nodeToString($elm);

    it('Should have transform the dom element to a string correctly', () => {
        expect(res).toBe('<bold>Hello world</bold>');
    });
});
