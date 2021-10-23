/**
 * @jest-environment jsdom
 */

import __decodeHtmlEntities from '../decodeHtmlEntities';

describe('sugar.js.html.decodeHtmlEntities', () => {
    it('Should process the passed string correctly', (done) => {
        expect(
            __decodeHtmlEntities(
                '&#111;&#108;&#105;&#118;&#105;&#101;&#114;&#046;&#098;&#111;&#115;&#115;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;',
            ),
        ).toBe('olivier.bossel@gmail.com');

        done();
    });
});
