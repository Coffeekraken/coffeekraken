import __fileName from '../filename.js';
describe('sugar.node.fs.filename', () => {
    it('Should get the filename from a simple file name', () => {
        expect(__fileName('hello/plop.txt')).toBe('plop.txt');
    });
    it('Should get the filename without extension from a simple file name', () => {
        expect(__fileName('hello/plop.txt', false)).toBe('plop');
    });
    it('Should get the filename from a more complex file name', () => {
        expect(__fileName('hello/plop.something.txt')).toBe(
            'plop.something.txt',
        );
    });
    it('Should get the filename withouth extension from a more complex file name', () => {
        expect(__fileName('hello/plop.something.txt', false)).toBe(
            'plop.something',
        );
    });
});
