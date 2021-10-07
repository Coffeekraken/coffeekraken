import __SColor from '../SColor';

describe('sugar.js.color.color', () => {
    it('Should parse and return the same color when passing hexa value in', () => {
        const color = new __SColor('#ff00ff');
        expect(color.toString()).toBe('#ff00ff');
    });
    it('Should parse and return the same color when passing hsl value in', () => {
        const color = new __SColor('hsl(257,25,50)');
        expect(color.toString()).toBe('#696080');
    });
});
