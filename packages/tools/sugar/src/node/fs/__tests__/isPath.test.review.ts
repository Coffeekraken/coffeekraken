import __isPath from '../isPath.js';
describe('sugar.node.fs.isPath', () => {
    it('Should detect that a valid path is a valid path', () => {
        expect(__isPath('/my/cool/path.png')).toBe(true);
    });
    it('Should detect that a simple file path is a valid path', () => {
        expect(__isPath('path.png')).toBe(true);
    });
    it('Should return true when checking for a valid path that exists', () => {
        expect(__isPath(`${__dirname}/data/file.jpg`, true)).toBe(true);
    });
    it('Should return false when checking for a valid path that does not exists', () => {
        expect(__isPath(`${__dirname}/data/file22232323.jpg`, true)).toBe(
            false,
        );
    });
    it('Should detect that passing null is not a valid path', () => {
        expect(__isPath(null)).toBe(false);
    });
});
