import __extractNoneGlob from '../extractNoneGlob.js';

describe('sugar.js.glob.extractNoneGlob', () => {
    it('Should extract none glob part correctly', () => {
        expect(__extractNoneGlob('/hello/world/**/*.js')).toBe('/hello/world');
    });
});
