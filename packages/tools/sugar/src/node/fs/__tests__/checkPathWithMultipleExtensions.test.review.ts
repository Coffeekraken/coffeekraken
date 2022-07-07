import __check from '../checkPathWithMultipleExtensions';
describe('sugar.node.fs.checkPathWithMultipleExtensions', () => {
    it('Should find a file with multiple extensions given', async () => {
        const filePath = __check(`${__dirname}/data/file.mkv`, [
            'css',
            'js',
            'txt',
        ]);
        expect(filePath).toBe(`${__dirname}/data/file.txt`);
    });
});
