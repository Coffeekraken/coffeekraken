import __folderSize from '../folderSize';
describe('sugar.node.fs.folderSize', () => {
    it('Should get a folder size correctly', async () => {
        const size = await __folderSize(`${__dirname}/data/hashfolder`);
        expect(size).toBe('190 B');
    });
    it('Should get a folder size correctly and return it without any formatting', async () => {
        const size = await __folderSize(`${__dirname}/data/hashfolder`, false);
        expect(size).toBe(190);
    });
});
