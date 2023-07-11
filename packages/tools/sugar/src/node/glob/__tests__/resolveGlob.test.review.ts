import __SFile from '@coffeekraken/s-file';
import __resolveGlobSync from '../resolveGlob.js';

describe('sugar.node.glob.resolveGlob', () => {
    it('Should resolve the passed glob correctly', (done) => {
        const files = __resolveGlobSync(`data/**/*`, {
            cwd: __dirname,
        });
        const file = <__SFile>files[0];
        expect(
            file.path.includes('src/node/glob/__tests__/data/myCoolData.txt'),
        ).toBe(true);
        expect(file.cwd.includes('src/node/glob/__tests__')).toBe(true);
        expect(file.relPath).toBe('data/myCoolData.txt');
        done();
    });
});
