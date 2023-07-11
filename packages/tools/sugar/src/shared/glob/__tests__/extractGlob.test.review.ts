import __extractGlob from '../extractGlob.js';

describe('sugar.js.glob.extractGlob', () => {
    it('Should extract none glob part correctly', () => {
        expect(
            __extractGlob(
                '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/toolkits/sugar/src/js/**/*.js',
            ),
        ).toBe('**/*.js');
    });
});
