import __getColorFor from '../getColorFor.js';

describe('sugar.shared.dev.color.getColorFor', () => {
    it('Should return me a simple color', () => {
        const color = __getColorFor('this');
        expect(typeof color).toBe('string');
    });

    it('Should return me a simple color every time the same for the passed ref', () => {
        const color = __getColorFor('that');
        const color1 = __getColorFor('that');
        expect(color).toBe(color1);
    });
});
