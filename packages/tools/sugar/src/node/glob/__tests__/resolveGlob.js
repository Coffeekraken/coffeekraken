"use strict";
module.exports = (__resolveGlob) => {
    describe('sugar.node.glob.resolveGlob', () => {
        it('Should resolve the passed glob correctly', async (done) => {
            const files = await __resolveGlob(`data/**/*`, {
                rootDir: __dirname
            });
            const file = files[0];
            expect(file.path.includes('src/node/glob/__tests__/data/myCoolData.txt')).toBe(true);
            expect(file.rootDir.includes('src/node/glob/__tests__')).toBe(true);
            expect(file.relPath).toBe('data/myCoolData.txt');
            done();
        });
    });
};
