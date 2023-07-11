/**
 * @jest-environment jsdom
 */

// @ts-nocheck

import __getTagNameFromHtmlClass from '../getTagNameFromHtmlClass.js';

describe('sugar.js.html.getTagNameFromHtmlClass', () => {
    it('Should get back the correct tagname from passed classes', (done) => {
        expect(__getTagNameFromHtmlClass(HTMLAnchorElement)).toBe('a');
        expect(__getTagNameFromHtmlClass(HTMLLinkElement)).toBe('link');

        done();
    });
});
